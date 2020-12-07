## Copyright 2019-2020 Smart Chain Arena LLC. ##

import smartpy as sp


class operator:
    def __init__(self, name, typesIn, typesOut):
        self.name = name
        self.typesIn = typesIn
        self.typesOut = typesOut
        self.instr = sp.Expr(
            "op",
            [name]
            + [sp.types.conv(t) for t in typesIn]
            + ["out"]
            + [sp.types.conv(t) for t in typesOut],
        )

    def __call__(self, *args):
        return sp.Expr(
            "call_michelson",
            [sp.expr(self.instr), sp.get_line_no()] + [sp.expr(x) for x in args],
        )


ADD = operator("ADD", [sp.TInt, sp.TInt], [sp.TInt])

MUL = operator("MUL", [sp.TInt, sp.TInt], [sp.TInt])


def DUP():
    t = sp.types.unknown()
    return operator("DUP", [t], [t, t])()


CHAIN_ID = operator("CHAIN_ID", [], [sp.TString])


def seq(l, *args):
    return sp.Expr(
        "seq_michelson", [sp.get_line_no(), len(l)] + l + [sp.expr(x) for x in args]
    )
