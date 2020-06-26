## Copyright 2019-2020 Smart Chain Arena LLC. ##

import browser
import smartpyio
import argparse
import os
import json
import sys
import traceback
from version import version
from urllib.request import urlopen

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="SmartPy")
    parser.add_argument("filename", metavar="f", type=str, help="", nargs="?")
    parser.add_argument("--version", action="store_true")
    parser.add_argument("--class_call", nargs="?")
    parser.add_argument("--scenario", nargs="?")
    parser.add_argument("--sexprfile", nargs="?")
    parser.add_argument("--pyadaptedfile", nargs="?")
    args = parser.parse_args()

    if args.version:
        print("SmartPy %s" % version)
        quit()
    if args.filename is None:
        print("filename required")
        quit(1)
    if args.filename.startswith("http"):
        code = urlopen(args.filename).read().decode("utf8")
    else:
        code = open(args.filename, "r").read()
    adaptedCode = smartpyio.adaptBlocks(code)
    context = globals()
    context["alert"] = browser.alert
    context["window"] = browser.window
    try:
        compiledCode = compile(adaptedCode, "SmartPy Script", "exec")
    except Exception as e:
        print ("Exception while parsing " + args.filename)
        print ('-'*60)
        traceback.print_exc(file=sys.stdout)
        print ('-'*60)
        sys.exit(1)

    try:
        exec(compiledCode, context)
    except Exception as e:
        print ("Exception while compiling " + args.filename)
        print ('-'*60)
        traceback.print_exc(file=sys.stdout)
        print ('-'*60)
        sys.exit(1)

    try:
        if args.class_call is not None:
            contract = eval(args.class_call, context)
    except Exception as e:
        print ("Exception while executing " + args.class_call)
        print ('-'*60)
        traceback.print_exc(file=sys.stdout)
        print ('-'*60)
        sys.exit(1)

    if args.sexprfile is not None:
        if args.class_call is None:
            raise Exception("Cannot export sexprfile without a --class_call.")
        open(args.sexprfile, "w").write(contract.export())
    if args.scenario:
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
                scenario = browser.scenario.messages  # trace
            scenarios.append({'shortname': test.shortname, 'longname': test.name, 'scenario' : scenario})
        open(args.scenario, "w").write(json.dumps(scenarios))
            # print ("Exporting %s" % args.scenario)
    if args.pyadaptedfile is not None:
        open(args.pyadaptedfile, "w").write(adaptedCode)
