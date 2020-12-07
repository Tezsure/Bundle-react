#!/usr/bin/env bash

set -e

export FORCE_COLOR=1

export smartml_app_name=SmartPy.sh

install_path=$(dirname "$0")
export smartpy_install_path="$install_path"

call_app () {
    export NODE_PATH=$smartpy_install_path/node_modules:$NODE_PATH
    node "$smartpy_install_path/smartml-cli.js" "$@"
}

case "$1" in
    "" | "help" | "--help" | "-h")
        call_app --help ;;
    # Aliases to cli-js commands:
    # If you add more, please update Meta.smartpy_dot_sh_aliases
    # in smartML/cli_js/node_main.ml
    "compile" | "compile-smartpy-class")
        if [ "$#" -lt 4 ]; then
            # Let node_main.ml print the error message:
            shift
            call_app compile-smartpy-class "$@"
        else
            script="$2"
            init="$3"
            output="$4"/$(basename "$4").smlse
            shift 4
            node $install_path/smartpyc.js "$script" --init "$init" --output "$output" "$@"
        fi
        ;;
    "test" )
        if [ "$#" -lt 3 ]; then
            # Let node_main.ml print the error message:
            shift
            call_app run-smartpy-test-in-interpreter "$@"
        else
            script="$2"
            output="$3"
            shift 3
            node $install_path/smartpyc.js "$script" --output "$output" "$@"
        fi
        ;;
    "run" )
        shift
        export NODE_PATH=$smartpy_install_path/node_modules:$NODE_PATH
        python3 $install_path/smartpy_cli.py "$@" ;;
    "test-sandbox" )
        shift
        call_app run-smartpy-test-in-interpreter "$@"
        $install_path/sandbox-scenarios.sh run_scenario_dir $2/*sc $2
        ;;
    # Non-advertised alias for now:
    "test-local-sandbox" )
        if [ -d _build/tezos-bin/ ] ; then
            export PATH=$PWD/_build/tezos-bin:$PATH
        fi
        shift
        call_app run-smartml-scenario-with-local-sandbox "$@" ;;
    * )
        call_app "$@" ;;
esac
