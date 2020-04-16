## Copyright 2019 Smart Chain Arena LLC. ##

from browser import alert, window

import traceback
import inspect
import sys

pyRange = range
pyBool  = bool
pyInt   = int
pySet   = set
pyList  = list
pyTuple = tuple
pyBytes = bytes
pyMap   = map

pyLen   = len

def get_line_no():
    if window.inBrowser:
        for x in reversed(getattr(inspect.currentframe(), "$stack")):
            line_info = getattr(x[1], '$line_info')
            if "exec" in line_info:
                return pyInt(line_info.split(",")[0])
        return -1
    else:
        for x in (inspect.stack()):
            if x.filename == "SmartPy Script":
                return x.lineno
        return -1

class Expr:
    def __init__(self, f, l):
        self._f = f
        self._l = l
        self.onUpdateHandlers = []
        self.attributes = {}
        self.opens = {}
        setattr(self, '__initialized', True)

    def __eq__       (self, other): return Expr("eq",       [self, spExpr(other), get_line_no()])
    def __ne__       (self, other): return Expr("neq",      [self, spExpr(other), get_line_no()])
    def __add__      (self, other): return Expr("add",      [self, spExpr(other), get_line_no()])
    def __sub__      (self, other): return Expr("sub",      [self, spExpr(other), get_line_no()])
    def __mul__      (self, other): return Expr("mul",      [self, spExpr(other), get_line_no()])
    def __mod__      (self, other): return Expr("mod",      [self, spExpr(other), get_line_no()])
    def __truediv__  (self, other): return Expr("truediv",  [self, spExpr(other), get_line_no()])
    def __floordiv__ (self, other): return Expr("floordiv", [self, spExpr(other), get_line_no()])

    def __radd__     (self, other): return Expr("add",      [spExpr(other), self, get_line_no()])
    def __rmul__     (self, other): return Expr("mul",      [spExpr(other), self, get_line_no()])
    def __rsub__     (self, other): return Expr("sub",      [spExpr(other), self, get_line_no()])

    def __lt__       (self, other): return Expr("lt",       [self, spExpr(other), get_line_no()])
    def __le__       (self, other): return Expr("le",       [self, spExpr(other), get_line_no()])
    def __gt__       (self, other): return Expr("gt",       [self, spExpr(other), get_line_no()])
    def __ge__       (self, other): return Expr("ge",       [self, spExpr(other), get_line_no()])
    def __or__       (self, other): return Expr("or",       [self, spExpr(other), get_line_no()])
    def __and__      (self, other): return Expr("and",      [self, spExpr(other), get_line_no()])

    def __getitem__  (self, item ): return Expr("getItem",  [self, spExpr(item), get_line_no()])

    def __abs__      (self):        return Expr("abs",      [self, get_line_no()])
    def __neg__      (self):        return Expr("neg",      [self, get_line_no()])
    def __invert__   (self):        return Expr("invert",   [self, get_line_no()])

    def __bool__     (self): self.__nonzero__()
    def __nonzero__  (self): raise Exception("Cannot convert expression to bool. Conditionals are forbidden on contract expressions. Please use ~ or sp.if instead of not or if.")

    def __hash__(self):
        return hash(self.export())
    def on_update(self, f):
        self.onUpdateHandlers.append(f)
    def get(self, item, defaultValue = None):
        if defaultValue is not None:
            return Expr("getItemDefault", [self, spExpr(item), spExpr(defaultValue)])
        return self.__getitem__(item)
    def __enter__(self):
        return getattr(self, '__asBlock').__enter__()
    def __exit__(self, type, value, traceback):
        getattr(self, '__asBlock').__exit__(type, value, traceback)
    def __iter__(self):
        raise Exception("Please use [sp.for var in expr] or [expr.items()] to iterate on a SmartPy expression.")
    def contains(self, value):
        return Expr("contains", [self, spExpr(value), get_line_no()])
    def __contains__(self, value):
        raise Exception("Instead of using expressions such as e1 in e2, please use e2.contains(e1).")
    def __call__(self, *args):
        raise Exception("Expression [%s] cannot be called" % str(self))
    def call(self, arg):
        return Expr("call_lambda", [self, spExpr(arg)])
    def __getattr__(self, attr):
        if "__" in attr:
            raise AttributeError("")
        try:
            return self.attributes[attr]
        except KeyError:
            result = Expr("attr", [self, attr, get_line_no()])
            self.attributes[attr] = result
            return result
    def __setattr__(self, attr, value):
        if '__' not in attr and hasattr(self, '__initialized'):
            sp.set(getattr(self, attr), value)
            if hasattr(getattr(self, attr), 'onUpdateHandlers') and getattr(self, attr).onUpdateHandlers:
                for f in getattr(self, attr).onUpdateHandlers:
                    f(getattr(self, attr), value)
        else:
            object.__setattr__(self, attr, value)
    def __delitem__(self, item):
        sp.delItem(self, item)
    def __setitem__(self, item, value):
        sp.set(self[item], value)
    def items(self):
        return Expr("items", [self, get_line_no()])
    def keys(self):
        return Expr("keys", [self, get_line_no()])
    def values(self):
        return Expr("values", [self, get_line_no()])
    def elements(self):
        return Expr("elements", [self, get_line_no()])
    def rev(self):
        return Expr("rev", [self, get_line_no()])
    def rev_items(self):
        return Expr("rev_items", [self, get_line_no()])
    def rev_keys(self):
        return Expr("rev_keys", [self, get_line_no()])
    def rev_values(self):
        return Expr("rev_values", [self, get_line_no()])
    def rev_elements(self):
        return Expr("rev_elements", [self, get_line_no()])
    def set(self, other):
        sp.set(self, spExpr(other))
    def add(self, item):
        sp.updateSet(self, item, True)
    def remove(self, item):
        sp.updateSet(self, item, False)
    def __repr__(self):
        return self.export()
    def match(self, constructor, argName = "arg"):
        b = CommandBlock(sp)
        sp.newCommand(Expr("match", [self, constructor, argName, b, get_line_no()]))
        b.value = Expr("variant_arg", [argName, get_line_no()])
        b.value.__asBlock = b
        return b

    def is_some(self):
        return self.is_variant("Some")
    def is_left(self):
        return self.is_variant("Left")
    def is_right(self):
        return self.is_variant("Right")
    def is_variant(self, name):
        return Expr("isVariant", [self, name, get_line_no()])
    def open_some(self):
        return self.open_variant("Some")
    def open_variant(self, name):
        try:
            return self.opens[name]
        except KeyError:
            result = Expr("openVariant", [self, name, get_line_no()])
            self.opens[name] = result
            return result
    def append(self, other):
        raise Exception("myList.append(..) is deprecated. Please use myList.push(..).\nBeware: push adds the element in front of the list (as in Michelson).")
    def push(self, other):
        return sp.set(self, sp.cons(spExpr(other), self))
    def add_seconds(self, seconds):
        return Expr("add_seconds", [self, spExpr(seconds), get_line_no()])
    def export(self):
        def ppe(e):
            if hasattr(e, "export"):
                return e.export()
            if isinstance(e, str):
                return '"%s"' % e
            return str(e)
        if self._l:
            return "(%s %s)" % (self._f, " ".join(ppe(x) for x in self._l))
        return "(%s)" % (self._f)

def literal(t, l): return Expr("literal", [ Expr(t, [l]), get_line_no() ])

def key_hash(s): return literal("key_hash", s)

def variant(cons, x): return Expr("variant", [cons, spExpr(x), get_line_no()])

unit = Expr("unit", [])
def bool(x)            : return literal("bool", x)
def int(x)             : return literal("int", x)
def int_or_nat(x)      : return literal("intOrNat", x)
def nat(x)             : return literal("nat", x)
def string(x)          : return literal("string", x)
_hex_digits = set("0123456789abcdefABCDEF")

def bytes(x)           :
    if isinstance(x, str) and x.startswith('0x') and all(c in _hex_digits for c in x[2:]) and pyLen(x) % 2 == 0:
        return literal("bytes", x)
    raise Exception("sp.bytes('0x...') awaits a string in hexadecimal format and got '%s' line %i." % (str(x), get_line_no()))
none = Expr("variant", ["None", unit, -1])
def some(x)            : return Expr("variant", ["Some", spExpr(x), get_line_no()])
def left(x)            : return Expr("variant", ["Left", spExpr(x), get_line_no()])
def right(x)           : return Expr("variant", ["Right", spExpr(x), get_line_no()])
def mutez(x)           : return literal("mutez", x) if isinstance(x, pyInt) else split_tokens(mutez(1), x, 1)
def timestamp(seconds) : return literal("timestamp", seconds)
def address(s)         :
    if s == "":
        raise Exception('"" is not a valid address')
    if not (any(s.startswith(prefix) for prefix in ['KT1', 'tz1', 'tz2', 'tz3'])):
        raise Exception('"%s" is not a valid address, it should start with tz1, tz2, tz3 or KT1.' % s)
    return literal("address", s)
def key(s)             : return literal("key", s)
def secret_key(s)      : return literal("secret_key", s)
def signature(sig)     : return literal("signature", sig)
def hash_key(x)        : return Expr("hash_key", [spExpr(x), get_line_no()])

def tez(x): return literal("mutez", 1000000 * x) if isinstance(x, pyInt) else split_tokens(tez(1), x, 1)

def spExpr(x):
    debug = False #isinstance(x, dict)
    if isinstance(x, Local):
        raise Exception("Local value of variable %s can be accessed by doing %s.value" % (x.name, x.name))
    if isinstance(x, Expr):
        if debug: alert('Expr')
        return x
    if x == ():
        if debug: alert('unit')
        return unit
    if isinstance(x, float):
        if debug: alert('float')
        return literal("float", x)
    if isinstance(x, pyBool):
        if debug: alert('bool')
        return literal("bool", x)
    if isinstance(x, pyInt):
        if debug: alert('int')
        if x < 0:
            return literal("int", x)
        return literal("intOrNat", x)
    if hasattr(x, "__int__"):
        return literal("intOrNat", pyInt(x))
    if isinstance(x, str):
        if debug: alert('str')
        return literal("string", x)
    if isinstance(x, pyBytes):
        if debug: alert('bytes')
        return literal("bytes", x.decode())
    if isinstance(x, TRecord):
        if debug: alert('TRecord')
        return literal("record", x)
    if isinstance(x, TList):
        if debug: alert('TList')
        return literal("list", x)
    if isinstance(x, WouldBeValue):
        if debug: alert('WouldBeValue')
        return x
    if isinstance(x, dict):
        if debug: alert('dict')
        return map(x)
    if isinstance(x, pySet):
        if any(isinstance(y, Expr) for y in x):
            raise Exception("{e1, ..., en} syntax is forbidden for SmartPy Expr. Please use sp.set([e1, .., en])")
        return set([spExpr(y) for y in x])
    if isinstance(x, pyTuple):
        if debug: alert('tuple')
        return tuple([spExpr(y) for y in x])
    if isinstance(x, pyList):
        if debug: alert('list')
        return list([spExpr(y) for y in x])
    if isinstance(x, pyRange):
        if debug: alert(x); alert('range')
        return list(pyList(x))
    if isinstance(x, Lambda):
        if debug: alert(x); alert('Lambda')
        return x.f
    if isinstance(x, TestAccount):
        if debug: alert(x); alert('TestAccount')
        return x.e
    raise Exception("spExpr: '%s' of type '%s'" % (str(x), str(type(x))))

class TType: pass

class TRecord(TType):
    def __init__(self, **kargs):
        args = sorted(kargs.items())
        self.kargs = kargs
        for (k, v) in args:
            setattr(self, k, sp.types.conv(v))
    def export(self):
        return "(record %s)" % " ".join("(%s %s)" % (x, y.export()) for (x, y) in sorted(self.kargs.items()))

class TVariant(TType):
    def __init__(self, **kargs):
        args = sorted(kargs.items())
        self.kargs = kargs
        for (k, v) in args:
            setattr(self, k, sp.types.conv(v))
    def export(self):
        return "(variant %s)" % " ".join("(%s %s)" % (x, y.export()) for (x, y) in sorted(self.kargs.items()))

def TOr(tleft, tright):
    return TVariant(Left = tleft, Right = tright)

class TSimple(TType):
    def __init__(self, name):
        self.name = name
    def export(self):
        return '"%s"' % self.name

TUnit      = TSimple("unit")
TBool      = TSimple("bool")
TInt       = TSimple("int")
TNat       = TSimple("nat")
TIntOrNat  = TSimple("intOrNat")
TString    = TSimple("string")
TBytes     = TSimple("bytes")
TMutez     = TSimple("mutez")
TTimestamp = TSimple("timestamp")
TAddress   = TSimple("address")
TKey       = TSimple("key")
TSecretKey = TSimple("secret_key")
TKeyHash   = TSimple("key_hash")
TSignature = TSimple("signature")

class TUnknown(TType):
    def __init__(self, id=""):
        self.id = id
    def export(self):
        return "(unknown \"%s\")" % self.id

class TList(TType):
    def __init__(self, t):
        self.t = t
    def export(self):
        return "(list %s)" % self.t.export()

class TMap(TType):
    def __init__(self, k, v):
        self.k = k
        self.v = v
    def export(self):
        return "(map %s %s)" % (sp.types.conv(self.k).export(), sp.types.conv(self.v).export())

class TSet(TType):
    def __init__(self, t):
        self.t = t
    def export(self):
        return "(set %s)" % (sp.types.conv(self.t).export())

class TBigMap(TType):
    def __init__(self, k, v):
        self.k = k
        self.v = v
    def export(self):
        return "(bigmap %s %s)" % (sp.types.conv(self.k).export(), sp.types.conv(self.v).export())

class TPair(TType):
    def __init__(self, t1, t2):
        self.t1 = t1
        self.t2 = t2
    def export(self):
        return "(pair %s %s)" % (sp.types.conv(self.t1).export(), sp.types.conv(self.t2).export())

class TAnnots(TType):
    def __init__(self, t, *annots):
        self.t = t
        self.annots = annots
    def export(self):
        return "(annots %s (%s))" % (sp.types.conv(self.t).export(), ' '.join('"%s"' % a for a in self.annots))

class TOption(TType):
    def __init__(self, t):
        self.t = t
    def export(self):
        return "(option %s)" % sp.types.conv(self.t).export()

class TContract(TType):
    def __init__(self, t):
        self.t = t
    def export(self):
        return "(contract %s)" % sp.types.conv(self.t).export()

class SpTypes:
    def __init__(self):
        self.unknownIds = 0
    def conv(self, t):
        # This line needs to come before lines with ==.
        if isinstance(t, TType) or isinstance(t, Expr):
            return t
        if t is None:
            t = self.unknown()
        if t == pyInt:
            raise Exception("Type int in this context is referred to as sp.TInt.")
        if t == pyBool:
            raise Exception("Type bool in this context is referred to as sp.TBool.")
        if t == str:
            raise Exception("Type str in this context is referred to as sp.TString.")
        if t == pyBytes:
            raise Exception("Type bytes in this context is referred to as sp.TBytes.")
        if isinstance(t, pyList) and pyLen(t) == 1:
            return TList(self.conv(t[0]))
        raise Exception("Bad type expression " + str(t))
    def trecord(self, **kargs):
        for x in kargs:
            kargs[x] = self.conv(kargs[x])
        return TRecord(kargs)
    def unknown(self, name = ""):
        self.unknownIds += 1
        return TUnknown("%s %i" % (name, self.unknownIds))
    def taddress(self):
        return TAddress
    def tlist(self, t):
        return TList(t)

class Data:
    def __getattr__(self, attr):
        if "__" in attr:
            raise AttributeError("")
        return Expr("attr", [Expr("data", []), attr])
    def __setattr__(self, attr, value):
        sp.set(getattr(self, attr), value)

class TreeBlock:
    def __init__(self):
        self.commands = []
        self.locals = []
    def append(self, command):
        self.commands.append(command)
    def addLocal(self, var):
        self.locals.append(var)
    def dropLocals(self):
        for x in reversed(self.locals):
            if not x.dropped:
                x.drop()
    def export(self):
        return "(%s)" % (' '.join(x.export() for x in self.commands))

class CommandBlock:
    def __init__(self, sp):
        self.sp = sp
        self.commands = TreeBlock()
        self.value = None
    def __enter__(self):
        self.currentBlock = self.sp.mb.currentBlock
        self.sp.mb.currentBlock = self.commands
        return self.value
    def __exit__(self, type, value, traceback):
        self.commands.dropLocals()
        self.sp.mb.currentBlock = self.currentBlock
    def export(self):
        return self.commands.export()

class Sp:
    def __init__(self):
        self.types         = SpTypes()
        self.profiling     = False
        self.profilingLogs = []
        self.mb            = None
    def profile(self, s = ""):
        if self.profiling:
            import datetime
            self.profilingLogs.append(str(datetime.datetime.now()) + " " + s)
    def setMB(self, mb):
        self.mb = mb
    def delItem(self, expr, item):
        self.newCommand(Expr("delItem", [expr, spExpr(item), get_line_no()]))
    def cons(self, x, xs):
        return Expr("cons", [spExpr(x), spExpr(xs), get_line_no()])
    def newCommand(self, command):
        if hasattr(self, 'mb') and self.mb is not None:
            self.mb.append(command)
    def set(self, var, value):
        if value is None:
            raise Exception("None value for ", var)
        self.newCommand(Expr("set", [var, spExpr(value), get_line_no()]))
    def dropLocal(self, var):
        self.newCommand(Expr("dropLocal", [var.name, get_line_no()]))
    def updateSet(self, set, item, add):
        self.newCommand(Expr("updateSet", [spExpr(set), spExpr(item), add, get_line_no()]))
    def defineLocal(self, local, name, value, t):
        self.newCommand(Expr("defineLocal", [name, value, t, get_line_no()]))
        self.mb.addLocal(local)
    def getData(self):
        return Expr("data", [])

sp = Sp()

class MessageBuilder:
    def __init__(self, addedMessage):
        if addedMessage is not None:
            self.name         = addedMessage.name
            self.addedMessage = addedMessage
        self.commands     = TreeBlock()
        self.currentBlock = self.commands
    def append(self, command):
        self.currentBlock.append(command)
    def addLocal(self, var):
        self.currentBlock.addLocal(var)
    def export(self):
        return self.commands.export()
    def __repr__(self):
        return "Commands:%s" % (' '.join(str(command) for command in self.commands))
    def pp(self):
        output = ["    " + (command.pp()) for command in self.commands]
        return "\n".join(outputs)

class ExecutedMessage:
    def __init__(self, title, result, expected):
        self.title    = title
        self.result   = result
        self.expected = expected
    def html(self):
        return ("" if self.expected else "<br><span class='partialType'>ERROR: Unexpected result</span> please use .run(valid = ..expected validation..)<br>") + self.result
    def __repr__(self):
        return self.html()

class PreparedMessage:
    def __init__(self):
        pass
    def html(self):
        data = {}
        data['action']       = 'message'
        data['id']           = self.contractId
        data['message']      = self.message
        data['params']       = self.params
        data['line_no']      = self.lineNo
        data['title']        = self.title
        data['messageClass'] = self.messageClass
        data['source']       = self.source
        data['sender']       = self.sender
        data['time']         = self.time
        data['amount']       = self.amount
        data['show']         = True
        data['valid']        = self.valid
        return [data]


def reduce(value):
    return Expr("reduce", [spExpr(value), get_line_no()])

class TestAccount:
    def __init__(self, seed):
        self.seed = seed
        self.e = Expr("account_of_seed", [self.seed, get_line_no()])
        self.address         = reduce(self.e.address)
        self.public_key_hash = reduce(self.e.public_key_hash)
        self.public_key      = reduce(self.e.public_key)
        self.secret_key      = reduce(self.e.secret_key)
    def export(self):
        return self.e.export()

def test_account(seed):
    return TestAccount(seed)

# sp.sign is already taken by the sign as in plus or minus
def make_signature(secret_key, message, message_format = 'Raw'):
    return reduce(Expr("make_signature", [spExpr(secret_key), spExpr(message), message_format, get_line_no()]))

def parse_account_or_address(account, name):
    if account is None:
        return "none"
    if isinstance(account, TestAccount):
        return "seed:" + account.seed
    if isinstance(account, Expr) and account._f == "literal" and account._l[0]._f == "address":
        return "address:" + str(account)
    raise Exception("%s should be of the form sp.test_account('...') or sp.address(...) : %s" % (name, str(account)))

class ExecMessage:
    def __init__(self, _contract, _message, params, kargs):
        self.message = _message
        self.params = None if params is None else spExpr(params)
        self.kargs = None if kargs is None else { k : spExpr(v) for (k, v) in kargs.items() }
        if params is not None and kargs:
            raise Exception("Message execution uses either one args or *kargs syntax, not both.")
        self.contract = _contract
        self.smartml = _contract.smartml
        self.lineNo = get_line_no()
    def html(self):
        return self.run().html()
    def run(self, sender = None, source = None, amount = mutez(0), now = None, valid = True):
        sp.profile(self.message + " begin " + str(get_line_no()))
        if isinstance(now, Expr) and now._f == "literal":
            now = now._l[0]
        if isinstance(amount, pyInt):
            raise Exception("Amount should be in tez or mutez and not int (use sp.tez(..) or sp.mutez(..))")
        if isinstance(now, Expr) and now._f == "timestamp":
            now = now._l[0]
        if now is not None:
            if not isinstance(now, pyInt):
                raise Exception("bad now " + str(now))
            self.smartml.setNow(now)
        if self.params is None:
            self.params = record(**self.kargs)
        self.contract.data = Expr("contractData", [self.smartml.contractId, get_line_no()])
        result = PreparedMessage()
        result.lineNo       = self.lineNo
        result.title        = self.contract.title if self.contract.title else ""
        result.messageClass = self.contract.execMessageClass
        result.source       = parse_account_or_address(source, "Source")
        result.sender       = parse_account_or_address(sender, "Sender")
        result.time         = self.smartml.time
        result.amount       = amount.export()
        result.contractId   = self.smartml.contractId
        result.message      = self.message
        result.params       = self.params.export()
        result.valid        = valid
        sp.profile(self.message + " end")
        return result

def unknownTypeParam(t, s):
    if t == "UNKNOWN":
        t = sp.types.unknown(s)
    t = sp.types.conv(t)
    return t

class WouldBeValue:
    def html(self, **kargs):
        return self.asValue().html(**kargs)

class record(WouldBeValue):
    def __init__(self, **fields):
        self.fields = { k : spExpr(v) for (k, v) in fields.items() }
        for (k, v) in self.fields.items():
            setattr(self, k, v)
        self.lineNo = get_line_no()
    def export(self):
        return "(record %i %s)" % (self.lineNo, " ".join("(%s %s)" % (k, v.export()) for (k, v) in sorted(self.fields.items())))
    def __repr__(self):
        return self.export()

class tuple(WouldBeValue):
    def __init__(self, l = []):
        self.l = l
        self.lineNo = get_line_no()
    def export(self):
        return "(tuple %s %s)" % (" ".join(spExpr(x).export() for x in self.l), self.lineNo)

def pair(e1, e2):
    return tuple([e1, e2])

class list(WouldBeValue):
    def __init__(self, l = [], t = "UNKNOWN"):
        self.t = unknownTypeParam(t, "list t")
        self.l = l
        self.lineNo = get_line_no()
    def push(self, other):
        return sp.set(self, sp.cons(spExpr(other), self))
    def export(self):
        return "(list %s %s %s)" % (self.t.export(), self.lineNo, " ".join(spExpr(x).export() for x in self.l))
    def concat(self):
        return Expr("concat", [self, get_line_no()])
    def rev(self):
        return Expr("rev", [self, get_line_no()])

class set(WouldBeValue):
    def __init__(self, l = None, t = "UNKNOWN"):
        if l is None:
            l = []
        self.t = unknownTypeParam(t, "set t")
        self.l = l
        self.lineNo = get_line_no()
    def contains(self, value):
        return Expr("contains", [self, spExpr(value), get_line_no()])
    def elements(self):
        return Expr("elements", [self, get_line_no()])
    def rev_elements(self):
        return Expr("rev_elements", [self, get_line_no()])
    def add(self, item):
        self.l.append(item)
    def remove(self, item):
        raise Exception("set.remove not implemented for immediate value, please use a local variable.")
    def export(self):
        return "(set %s %s %s)" % (self.t.export(), self.lineNo, " ".join(spExpr(x).export() for x in self.l))

class mapOrBigMap(WouldBeValue):
    def __init__(self, l = {}, tkey = "UNKNOWN", tvalue = "UNKNOWN"):
        self.tkey = unknownTypeParam(tkey, "%s tkey" % self.name())
        self.tvalue = unknownTypeParam(tvalue, "%s tvalue" % self.name())
        self.l = l
        self.lineNo = get_line_no()
    def contains(self, value):
        return Expr("contains", [self, spExpr(value), get_line_no()])
    def export(self):
        return "(%s %s %s %s %s)" % (self.name(), self.tkey.export(), self.tvalue.export(), self.lineNo,
                                     " ".join("(%s %s)" % (spExpr(k).export(), spExpr(v).export()) for (k, v) in self.l.items()))

class map(mapOrBigMap):
    def name(self):
        return "map"
    def items(self):
        return Expr("items", [self, get_line_no()])
    def keys(self):
        return Expr("keys", [self, get_line_no()])
    def values(self):
        return Expr("values", [self, get_line_no()])
    def rev_items(self):
        return Expr("rev_items", [self, get_line_no()])
    def rev_keys(self):
        return Expr("rev_keys", [self, get_line_no()])
    def rev_values(self):
        return Expr("rev_values", [self, get_line_no()])
    def __getitem__  (self, item):
        return Expr("getItem", [self, spExpr(item), get_line_no()])

class big_map(mapOrBigMap):
    def name(self):
        return "big_map"

class Smartml:
    def __init__(self, contract = None):
        self.ctx  = window.smartmlCtx
        self.time = 0
        if contract is not None:
            sp.profile("smartml linking")
            contract = contract.export()
            sp.profile("smartml export")
            self.contractId = window.nextId()
            window.contracts[self.contractId] = self
            self.contract = contract
            sp.profile("smartml link")
    def runScenario(self, messages):
        self.ctx.call('runScenarioInBrowser', messages)
    def setNow(self, time):
        self.time = time
        return "Setting time to [%s].<br>" % time

class Contract:
    def __init__(self, **kargs):
        self.init(**kargs)
    def add_flag(self, flag):
        if not hasattr(self, 'flags'):
            self.flags = pySet()
        self.flags.update([flag])
    def init(self, **kargs):
        self.currentBlock = None
        if not hasattr(self, 'verbose'):
            self.verbose = False
        if not hasattr(self, 'messages'):
            self.messages = {}
        if not hasattr(self, 'flags'):
            self.flags = pySet()
        if not hasattr(self, 'execMessageClass'):
            self.execMessageClass = ""
        if not hasattr(self, 'title'):
            self.title = ""
        if 'data' in kargs:
            self.storage = kargs['data']
        else:
            self.storage = record(**kargs)
        self.collectMessages()
    def addMessage(self, addedMessage):
        sp.profile("addMessage begin " + addedMessage.name)
        addedMessage.contract = self
        mb = MessageBuilder(addedMessage)
        self.mb = mb
        sp.setMB(mb)
        x = addedMessage.f(self, Expr("params", [addedMessage.lineNo]))
        if x is not None:
            raise Exception("Entry point failure for %s (line %i): entry points cannot have return statements." % (addedMessage.name, addedMessage.lineNo))
        mb.commands.dropLocals()
        self.mb = None
        sp.setMB(None)
        self.messages[addedMessage.name] = mb
        setattr(self, addedMessage.name, addedMessage)
        if not isinstance(self.data, Expr) or self.data._f != 'data':
            raise Exception("It's forbidden to change self.data directly.\n self.data = " + str(self.data))
        sp.profile("addMessage end " + addedMessage.name)
    def buildExtraMessages(self):
        pass
    def collectMessages(self):
        sp.profile("CollectMessages begin " + self.__class__.__name__)
        self.data = sp.getData()
        for f in dir(self):
            attr = getattr(self, f)
            if isinstance(attr, AddedMessage):
                self.addMessage(AddedMessage(attr.name, attr.f, attr.lineNo))
        self.buildExtraMessages()
        #self.smartml = window.buildSmartlmJS(self)
        self.smartml = Smartml(self)
        sp.profile("CollectMessages smartml " + self.__class__.__name__)
        self.data = Expr("contractData", [self.smartml.contractId, get_line_no()])
        sp.profile("CollectMessages end " + self.__class__.__name__)
    def export(self):
        result = "(storage %s\nmessages (%s)\nflags(%s))" % (self.storage.export(),
                                                           (" ".join("(%s %s)" % (k, v.export()) for (k, v) in sorted(self.messages.items()))),
                                                           (" ".join(str(flag) for flag in self.flags)))
        if self.verbose:
            alert("Creating\n\n%s" % result)
            window.console.log(result)
        return result
    def setNow(self, time):
        return self.smartml.setNow(time)
    def __repr__(self):
        return str(self.smartml)
    def fullHtml(self, default = "SmartPy", onlyDefault = False):
        data = {}
        data['action'] = 'newContract'
        data['id']     = self.smartml.contractId
        data['export'] = self.smartml.contract
        data['line_no'] = get_line_no()
        data['show']   = True
        return [data]

class AddedMessage:
    def __init__(self, name, f, lineNo):
        self.name   = name
        self.f      = f
        self.lineNo = lineNo
    def __call__(self, params = None, **kargs):
        return ExecMessage(self.contract, self.name, params, kargs)

def entry_point(f, name = None):
    if name is None:
        name = f.__name__
    return AddedMessage(name, f, get_line_no())

self    = Expr("self", [])
sender  = Expr("sender", [])
source  = Expr("source", [])
amount  = Expr("amount", [])
balance = Expr("balance", [])
now     = Expr("now", [])

def to_address(contract):
    return Expr("to_address", [spExpr(contract), get_line_no()])
def implicit_account(key_hash):
    return Expr("implicit_account", [spExpr(key_hash), get_line_no()])

default_verify_message = None
def verify(cond, ghost = False, message = None):
    if message is None:
        message = default_verify_message
    if message is None:
        return sp.newCommand(Expr("verify", [spExpr(cond), ghost, get_line_no()]))
    else:
        return sp.newCommand(Expr("verify", [spExpr(cond), ghost, spExpr(message), get_line_no()]))
def ghostVerify(cond, message = None):
    return verify(cond, True, message)
def failwith(message):
    return sp.newCommand(Expr("failwith", [spExpr(message), get_line_no()]))

## Control
def else_():
    b = CommandBlock(sp)
    sp.newCommand(Expr("elseBlock", [b]))
    return b
def while_(condition):
    b = CommandBlock(sp)
    sp.newCommand(Expr("whileBlock", [spExpr(condition), b, get_line_no()]))
    return b
def if_some(condition, name):
    b = CommandBlock(sp)
    sp.newCommand(Expr("ifSomeBlock", [spExpr(condition), name, b, get_line_no()]))
    value = Expr("openVariant", [spExpr(condition), "Some", get_line_no()])
    value.__asBlock = b
    b.value = value
    return value
def if_(condition):
    b = CommandBlock(sp)
    sp.newCommand(Expr("ifBlock", [spExpr(condition), b, get_line_no()]))
    return b
def for_(name, value):
    value = spExpr(value)
    b = CommandBlock(sp)
    t = sp.types.unknown("for %s" % name)
    sp.newCommand(Expr("forGroup", [name, t, value, b, get_line_no()]))
    value = Expr("iter", [name, t, get_line_no()])
    value.__asBlock = b
    b.value = value
    return value
def update_map(map, key, value):
    return Expr("update_map", [spExpr(map), spExpr(key), spExpr(value), get_line_no()])
def ediv(num, den):
    return Expr("ediv", [spExpr(num), spExpr(den)])
def pack(value):
    return Expr("pack", [spExpr(value), get_line_no()])
def unpack(value, t = "UNKNOWN"):
    t = unknownTypeParam(t, "unpack.t")
    return Expr("unpack", [spExpr(value), t, get_line_no()])
def blake2b(value):
    return Expr("hashCrypto", ["BLAKE2B", spExpr(value), get_line_no()])
def sha512(value):
    return Expr("hashCrypto", ["SHA512", spExpr(value), get_line_no()])
def sha256(value):
    return Expr("hashCrypto", ["SHA256", spExpr(value), get_line_no()])
def range(a, b, step = 1):
    return Expr("range", [spExpr(a), spExpr(b), spExpr(step), get_line_no()])
def sum(value):
    return Expr("sum", [value, get_line_no()])
def slice(expression, offset, length):
    return Expr("slice", [spExpr(offset), spExpr(length), spExpr(expression), get_line_no()])
def concat(value):
    return Expr("concat", [spExpr(value), get_line_no()])
def check_signature(pk, sig, msg):
    return Expr("check_signature", [pk, sig, msg, get_line_no()])
def sign(e):
    return Expr("sign", [e, get_line_no()])
def spmax(x, y):
    return Expr("max", [spExpr(x), spExpr(y), get_line_no()])
def spmin(x, y):
    return Expr("min", [spExpr(x), spExpr(y), get_line_no()])
def split_tokens(m, quantity, totalQuantity):
    return (Expr("split_tokens", [spExpr(m), spExpr(quantity), spExpr(totalQuantity), get_line_no()]))

def expr(v):
    return spExpr(v)

def nat(v):
    return Expr("nat", [spExpr(v), get_line_no()])
def setInt(v):
    return Expr("int", [spExpr(v), get_line_no()])
def to_int(v):
    return Expr("toInt", [spExpr(v), get_line_no()])
def is_nat(v):
    return Expr("isNat", [spExpr(v), get_line_no()])
def as_nat(v):
    return is_nat(v).open_some()

class Lambda:
    def __init__(self, f, params, tParams):
        self.id = window.lambdaNextId
        self.params = params
        self.tParams = tParams
        window.lambdaNextId += 1
        self.f = self.collectLambda(f)
    def collectLambda(self, f):
        prev = sp.mb
        if sp.mb is None:
            sp.mb = MessageBuilder(None)
        currentBlock = sp.mb.currentBlock
        commands     = TreeBlock()
        sp.mb.currentBlock = commands
        result = f(Expr("lambdaParams", [self.id, self.params, get_line_no(), self.tParams]))
        sp.mb.commands.dropLocals()
        sp.mb.currentBlock = currentBlock
        self.mb = prev
        return Expr("lambda", [self.id, self.params, get_line_no(), commands, result])
    def call(self, arg):
        return Expr("call_lambda", [self.f, spExpr(arg)])
    def apply(self, arg):
        print(self.f)
        return Expr("apply_lambda", [self.f, spExpr(arg)])
    def export(self):
        return self.f.export()

def build_lambda(f, params = "", tParams = "UNKNOWN"):
    if tParams == "UNKNOWN":
        tParams = sp.types.unknown("lambda %s" % params)
    tParams = sp.types.conv(tParams)
    return Lambda(f, params, tParams)

class Local:
    def __init__(self, name, value, t = "UNKNOWN"):
        if t == "UNKNOWN":
            t = sp.types.unknown("local %s" % name)
        t = sp.types.conv(t)
        sp.defineLocal(self, name, spExpr(value), t)
        self.init = False
        self.name = name
        self.val = value
        self.t = t
        self.dropped = False
        self.init = True
    def __getattr__(self, attr):
        if attr == "value":
            return Expr("getLocal", [self.name, self.t, get_line_no()])
        raise AttributeError("Local variable '%s' doesn't have attribute %s. Use '%s.value' to access its value." % (self.name, attr, self.name))
    def __setattr__(self, attr, value):
        if attr == "init":
            object.__setattr__(self, attr, value)
        elif attr == "value" and self.init:
            sp.set(self, spExpr(value))
        else:
            object.__setattr__(self, attr, value)
    def drop(self):
        if self.dropped:
            raise Exception("Local variable %s is already dropped." % self.name)
        self.dropped = True
        sp.dropLocal(self)
    def export(self):
        return self.value.export()
def local(name, value, t = "UNKNOWN"):
    return Local(name, value, t)
def transfer(arg, amount, destination):
    sp.newCommand(Expr("transfer", [spExpr(arg), spExpr(amount), spExpr(destination), get_line_no()]))
def set_delegate(key_hash):
    sp.newCommand(Expr("set_delegate", [spExpr(key_hash), get_line_no()]))
def contract(t, address, entry_point = ""):
    t = sp.types.conv(t)
    return Expr("contract", [entry_point, sp.types.conv(t), spExpr(address), get_line_no()])
def set_type(var, t):
    result = Expr("setType", [spExpr(var), sp.types.conv(t), get_line_no()])
    sp.newCommand(result)
    return result
def type_of(e):
    return Expr("type_of", [spExpr(e), get_line_no()])
def profile(s):
    sp.profile(s)
def setProfiling(b):
    sp.profiling     = b
    sp.profilingLogs = []

def fst(e):
    return Expr("first", [spExpr(e), get_line_no()])
def snd(e):
    return Expr("second", [spExpr(e), get_line_no()])

def len(e):
    return Expr("size", [spExpr(e), get_line_no()])

types = sp.types

import smartpyio
normalMax = max
smartpyio.mymax = spmax
max = spmax
min = spmin

def poly_equal(a, b):
    return ( pack(a) == pack(set_type(b, type_of(a))) )

class Scenario:
    def __init__(self):
        self.messages   = []
        self.smartml    = Smartml(None)
        self.exceptions = []
        self.nextId     = 0
    def acc(self, message, show):
        if isinstance(message, str):
            if show:
                self.messages.append(message)
        else:
            self.messages += [self.setShow(x, show) for x in message]
    def setShow(self, x, show):
        x['show'] = show
        return x
    def register(self, element, show = False):
        if isinstance(element, Contract):
            self.acc(element.fullHtml(), show)
        else:
            self.acc(element.html(), show)
    def __iadd__(self, element):
        self.register(element, True)
        return self
    def add(self, *elements):
        for element in elements:
            self.register(element, True)
        return self
    def pp(self):
        if window.inBrowser:
            import javascript
            sp.profile("scenario - clean ui " + self.__class__.__name__)
            window.setOutput("")
            sp.profile("scenario - prepare messages " + self.__class__.__name__)
            messages = javascript.JSON.stringify(self.messages)
            sp.profile("scenario - run " + self.__class__.__name__)
            self.smartml.runScenario(messages)
            sp.profile("scenario - done " + self.__class__.__name__)
        else:
            window.setOutput(self.messages)
        return self
    def verify(self, condition):
        if isinstance(condition, pyBool):
            if not condition:
                raise Exception("Assert Failure")
        else:
            data = {}
            data['action']    = 'verify'
            data['condition'] = condition.export()
            data['line_no']    = get_line_no()
            self.messages += [data]
        return self
    def verify_equal(self, v1, v2):
        data = {}
        data['action']    = 'verify'
        data['condition'] = poly_equal(v1, v2).export()
        data['line_no']    = get_line_no()
        self.messages += [data]
        return self
    def compute(self, expression):
        id = self.nextId
        data = {}
        data['action']     = 'compute'
        data['expression'] = expression.export()
        data['id']         = id
        data['line_no']     = get_line_no()
        self.messages += [data]
        self.nextId += 1
        return Expr("scenario_var", [id, get_line_no()])
    def show(self, expression, html = True, stripStrings = False):
        data = {}
        data['action']       = 'show'
        data['html']         = html
        data['stripStrings'] = stripStrings
        data['expression']   = spExpr(expression).export()
        data['line_no']       = get_line_no()
        self.messages += [data]
        return self
    def table_of_contents(self):
        return self.tag("p", "[[TABLEOFCONTENTS]]")
    def p(self, s):
        return self.tag("p", s)
    def h1(self, s):
        return self.tag("h1", s)
    def h2(self, s):
        return self.tag("h2", s)
    def h3(self, s):
        return self.tag("h3", s)
    def h4(self, s):
        return self.tag("h4", s)
    def tag(self, tag, s):
        data = {}
        data['action'] = 'html'
        data['tag']    = tag
        data['inner']  = s
        data['line_no'] = get_line_no()
        self.messages += [data]
        return self
    def simulation(self, c):
        if window.inBrowser:
            data = {}
            data['action'] = 'simulation'
            data['id']     = c.smartml.contractId
            data['line_no'] = get_line_no()
            self.messages += [data]
        else:
            self.p("No interactive simulation available outofbrowser.")

def test_scenario():
    scenario = Scenario()
    window.activeScenario = scenario
    return scenario

def send(destination, amount):
    transfer(unit, amount, contract(TUnit, destination).open_some())

# For backward "compatibility"
def Record(**args):
    raise Exception("sp.Record is obsolete, please use sp.record.")
def BigMap(**args):
    raise Exception("sp.BigMap is obsolete, please use sp.big_map.")
def Map(**args):
    raise Exception("sp.Map is obsolete, please use sp.map.")
def Set(**args):
    raise Exception("sp.Set is obsolete, please use sp.set.")

# Library

def vector(xs, tkey = TIntOrNat, tvalue = "UNKNOWN"):
    return map(l = {k : v for (k, v) in enumerate(xs)}, tkey = tkey, tvalue = tvalue)

def matrix(xs, tkey = TIntOrNat, tvalue = "UNKNOWN"):
    return vector([vector(x, tkey = tkey, tvalue = tvalue) for x in xs], tkey = tkey)

def cube(xs, tkey = TIntOrNat, tvalue = "UNKNOWN"):
    return vector([matrix(x, tkey = tkey, tvalue = tvalue) for x in xs], tkey = tkey)

inBrowser = window.inBrowser

def add_test(*args, **kargs):
    return smartpyio.add_test(*args, **kargs)
