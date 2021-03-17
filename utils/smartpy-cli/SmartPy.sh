#!/usr/bin/env bash

set -e

export FORCE_COLOR=1

export smartml_app_name=SmartPy.sh

install_path=$(dirname "$0")
export smartpy_install_path="$install_path"

usage () {
    echo "Usage:"
    echo "   $0 <target> <script> <output> [--purge] [--html]"
    echo "         <target>                         : a target, compile or test"
    echo "         <script>                         : a python script containing SmartPy code"
    echo "         <output>                         : a directory for the results"
    echo "         --purge                          : optional, clean output_directory before running"
    echo "         --html                           : optional, add html logs and outputs"
    echo "         --protocol <delphi|edo|florence> : optional, select target protocol"
    echo "         --<flag> <arguments>             : optional, set some flag with arguments"
    echo "         --<flag>                         : optional, activate some boolean flag"
    echo "         --no-<flag>                      : optional, deactivate some boolean flag"
}


protocol=PtEdo2ZkT9oKpimTah6x2embF25oss54njMuPzkJTEi5RqfdZFA

native=no
args="$@"
set --
for arg in $args
do
    if [[ "$arg" == --native ]]; then
        native=yes
    elif [[ "$arg" == --no-native ]]; then
        native=no
    elif [[ "$arg" == florence ]]; then
        protocol=PsFLorBArSaXjuy9oP76Qv1v2FRYnUs7TFtteK5GkRBC24JvbdE
        set -- "$@" "$arg"
    elif [[ "$arg" == florenceNoBa ]]; then
        protocol=PsFLorenaUUuikDWvMDr6fGBRG8kt3e3D3fHoXK1j1BFRxeSH4i
        set -- "$@" "$arg"
    else
        set -- "$@" "$arg"
    fi
done


if [[ "$native" == yes ]]; then
    smartpyc="$install_path/smartpyc"
else
    smartpyc="node $install_path/smartpyc.js"
fi

case "$1" in
    "" | "help" | "--help" | "-h")
        usage
        ;;
    # Aliases to cli-js commands:
    # If you add more, please update Meta.smartpy_dot_sh_aliases
    # in smartML/cli_js/node_main.ml
    "compile")
        [ "$#" -lt 3 ] && { usage; exit 1; }
        script="$2"
        output="$3"
        shift 3
        $smartpyc "$script" --comp --output "$output" --install $install_path "$@"
        ;;
    "test")
        [ "$#" -lt 3 ] && { usage; exit 1; }
        script="$2"
        output="$3"
        shift 3
        $smartpyc "$script" --output "$output" --install $install_path "$@"
        ;;
    "test-sandbox" )
        [ "$#" -lt 3 ] && { usage; exit 1; }
        script="$2"
        output="$3"
        shift 3
        scripts/with_sandbox.sh sh -c \
          "$smartpyc $script --output $output --sandbox \$SANDBOX_PORT $@"
        ;;
    "test-mockup" )
        [ "$#" -lt 3 ] && { usage; exit 1; }
        script="$2"
        output="$3"
        shift 3
        MOCKUP=$(mktemp -d "_mockup.XXXXXX")
        _build/tezos-bin/tezos-client \
          --protocol $protocol \
          --base-dir $MOCKUP \
          create mockup
        $smartpyc $script --output $output --mockup $MOCKUP $@ \
          && rm -rf $MOCKUP
        ;;
    * )
        echo "SmartPy.sh. Unknown argument: $*"
        usage
        exit 1
esac
