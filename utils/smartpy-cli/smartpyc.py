## Copyright 2019-2020 Smart Chain Arena LLC. ##

# This module is used by smartpyc.ml. No other code shoud rely on it.

import sys, traceback, json, browser, smartpyio

def write_pure_py(out, in_py):
    with open(in_py, "r") as in_py:
        with open(out, "w") as out:
            in_py = in_py.read()
            r = smartpyio.adaptBlocks(in_py)
            out.write(r)
    return r

def run_script(in_py, code, context):
    try:
        smartpyio.script_filename = in_py
        code = compile(code, in_py, "exec")
    except SyntaxError as e:
        traceback.print_exc(file=sys.stdout, limit=0)
        sys.exit(1)
    try:
        exec(code, context)
    except:
        traceback.print_exc(file=sys.stdout, limit=-1)
        sys.exit(1)

def init_contract(arg, context):
    try:
        contract = compile(arg, "init", "eval")
    except SyntaxError as e:
        traceback.print_exc(file=sys.stdout, limit=0)
        sys.exit(1)
    try:
        contract = eval(contract, context)
    except:
        traceback.print_exc(file=sys.stdout, limit=-1)
        sys.exit(1)
    return contract

def write_smlse(out_smlse, in_py, in_pure_py, init):
    open(out_smlse, "w").write(contract.export())

def run_tests():
    scenarios = []
    for test in browser.window.pythonTests:
        try:
            test.eval()
        except Exception as exn:
            data = {}
            data["action"] = "error"
            data["message"] = str(exn)
            if browser.scenario is not None:
                browser.scenario += [data]
            else:
                browser.scenario = [data]
                print ("Exception while testing " + args.filename)
                print ('-'*60)
                traceback.print_exc(file=sys.stdout)
                print ('-'*60)
        if isinstance(browser.scenario, list):
            scenario = browser.scenario
        else:
            scenario = browser.scenario.messages
        scenarios.append({'shortname': test.shortname, 'longname': test.name, 'scenario' : scenario})
    return json.dumps(scenarios)

def write_tests(out_scenario_sc, fn_py, fn_pure_py):
    code = write_pure_py(fn_pure_py, fn_py)
    run_script(fn_py, code, {})
    scenarios = run_tests()
    open(out_scenario_sc, "w").write(scenarios)

def write_with_init(out_smlse, out_scenario_sc, fn_py, fn_pure_py, init):
    code = write_pure_py(fn_pure_py, fn_py)
    context = {}
    run_script(fn_py, code, context)
    contract = init_contract(init, context)
    open(out_smlse, "w").write(contract.export())
    scenarios = run_tests()
    open(out_scenario_sc, "w").write(scenarios)

if sys.argv[1] == "write_with_init":
    write_with_init(*sys.argv[2:])
elif sys.argv[1] == "write_tests":
    write_tests(*sys.argv[2:])
else:
    assert False
