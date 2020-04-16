## Copyright 2019 Smart Chain Arena LLC. ##

import browser
import smartpyio
import argparse
import os
import json
from version import version
from urllib.request import urlopen

def compileContract(contract, targetBaseFilename = None, targetDirectory = None, targetSmlse = None, targetCode = None, targetStorage = None, targetTypes = None):
    """Exports contract to smlse, code and storage files.
    Several options to determine these files: either through a targetBaseFilename,
    a targetDirectory, by explicitly determining each of them or by a combination of the previous options.
    """
    import subprocess
    if targetDirectory is None and targetBaseFilename is not None:
        targetDirectory = os.path.dirname(targetBaseFilename)
    if targetDirectory is not None:
        os.makedirs(targetDirectory, exist_ok = True)
        if targetBaseFilename is None:
            targetBaseFilename = targetDirectory + "/contract"
    if targetBaseFilename is not None:
        if targetSmlse is None:
            targetSmlse = targetBaseFilename + "Expression.smlse"
        if targetCode is None:
            targetCode = targetBaseFilename + "Code.tz"
        if targetStorage is None:
            targetStorage = targetBaseFilename + "Storage.tz"
        if targetTypes is None:
            targetTypes = targetBaseFilename + "Types.tz"

    if targetSmlse is not None:
        open(targetSmlse, 'w').write(contract.export())
        command = ["node", os.path.dirname(os.path.realpath(__file__)) + "/smartmlbasic.js",]
        for (opt, arg) in [("--compile", targetSmlse), ("--targetCode", targetCode), ("--targetStorage", targetStorage), ("--targetTypes", targetTypes)]:
            if arg is not None:
                os.makedirs(os.path.dirname(arg), exist_ok = True)
                command += [opt, arg]
        subprocess.run(command)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='SmartPy')
    parser.add_argument('filename', metavar='f', type=str, help='', nargs='?')
    parser.add_argument('--version', action="store_true")
    parser.add_argument('--class_call', nargs="?")
    parser.add_argument('--scenario', nargs="?")
    parser.add_argument('--sexprfile', nargs="?")
    parser.add_argument('--pyadaptedfile', nargs="?")
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
        code = open(args.filename, 'r').read()
    adaptedCode = smartpyio.adaptBlocks(code)
    context = globals()
    context['alert'] = browser.alert
    context['window'] = browser.window
    compiledCode = compile(adaptedCode, 'SmartPy Script', 'exec')
    exec(compiledCode, context)
    if args.class_call is not None:
        contract = eval(args.class_call, context)
    if args.sexprfile is not None:
        if args.class_call is None:
            raise Exception("Cannot export sexprfile without a --class_call.")
        open(args.sexprfile, 'w').write(contract.export())
    if args.scenario:
        for test in browser.window.pythonTests:
            try:
                test.eval()
            except Exception as exn:
                data = {}
                data['action'] = 'error'
                data['message'] = str(exn)
                if browser.scenario is not None:
                    browser.scenario += [data]
                else:
                    browser.scenario = [data]
            if isinstance(browser.scenario, list):
                scenario = browser.scenario
            else:
                scenario = browser.scenario.messages # trace
            open(args.scenario, 'w').write(json.dumps(scenario))
            # print ("Exporting %s" % args.scenario)
    if args.pyadaptedfile is not None:
        open(args.pyadaptedfile, 'w').write(adaptedCode)
