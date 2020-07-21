#!/usr/bin/env bash

set -e

export FORCE_COLOR=1

say () {
    {
        printf "[SmartPyInstaller] "
        printf "$@"
        printf "\n"
    } >&2
}

export smartml_app_name=SmartPy.sh
install_path=$(dirname "$0")
export smartpy_install_path="$install_path"

call_app () {
    export NODE_PATH=$smartpy_install_path/node_modules:$NODE_PATH
    node "$smartpy_install_path/smartml-cli.js" "$@"
}
usage () {
    if [ -f "$smartpy_install_path/smartml-cli.js" ] ; then
        call_app --help
    else
        cat >&2 <<EOF
[SmartPyInstaller]

See introduction: https://medium.com/@SmartPy_io/f5bd8772b74a

Install directory: $install_path

Usage: $(basename $0) <command> <arguments>

- local-install PATH                   : Install the default version of SmartPy at PATH.
- local-install-auto                   : Like local-install but get the 'auto' version, as first distributed.
- local-install-dev PATH               : Like local-install but get the 'dev' version.
- local-install-test PATH              : Like local-install but get the 'test' version.
- local-install-custom DISTRIB PATH    : Like local-install but get the 'DISTRIB' version.
- local-install-from SRC-PATH DST-PATH :
  Install from another installation, or from the git repository's python/
  directory.

EOF
    fi
}

download () {
    local uri="$1"
    local out="$2"
    say "Downloading $uri to $out ..."
    if [ -f "$out" ] ; then
        rm "$out"
    fi
    curl --fail --show-error -s "$uri" > "$out"
    if [ -f "$out" ] ; then
        :
    else
        say "Download of '$uri' failed"
        exit 4
    fi
}

files_to_install="
smartpy.py
smartpyio.py
smartpy_cli.py
browser.py
version.py
SmartPy.sh
smartml-cli.js
reference.html
asciidoctor.css
coderay-asciidoctor.css
scripts/demo.py
templates/welcome.py
"

install_from () {
    local method="$1"
    local from="$2"
    local path="$3"

    if [ "$path" = "" ]; then
        echo "Install in default directory: ~/smartpy-cli ? [y/N] "
        read default_install
        if [ "$default_install" = "y" ]; then
            path=~/smartpy-cli
        else
            echo "Cancelling"
            exit 1
        fi
    fi

    if [ -d "$path" ]; then
        echo "Directory ${path} already exists."
        echo "Files will be directly created in ${path}; overwrite ? [y/N] "
        read overwrite
        if [ "$overwrite" != "y" ]; then
            echo "Cancelling"
            exit 1
        fi
    fi

    mkdir -p $path/scripts
    for f in $files_to_install ; do
        mkdir -p "$(dirname "$path/$f")"
        $method "$from/$f" "$path/$f"
    done
    ( cd "$path" ;
      npm init --yes ;
      npm install libsodium-wrappers-sumo bs58check chalk ; )
    chmod +x "$path/SmartPy.sh"
    say "Installation successful in $path"
}

case "$1" in
    "" | "help" | "--help" | "-h")
        usage ;;
    "local-install" )
        install_from download https://SmartPy.io/smartpy-cli "$2" ;;
    "local-install-dev" )
        install_from download https://SmartPy.io/smartpy-cli-dev "$2" ;;
    "local-install-test" )
        install_from download https://SmartPy.io/smartpy-cli-test "$2" ;;
    "local-install-custom" )
        install_from download "$2" "$3" ;;
    "local-install-auto" )
        install_from download https://smartpy.io/dev/cli "$2" ;;
    "local-install-from" )
        shift
        install_from cp "$1" "$2" ;;
    # Aliases to cli-js commands:
    # If you add more, please update Meta.smartpy_dot_sh_aliases
    # in smartML/cli_js/node_main.ml
    "compile" )
        shift
        call_app compile-smartpy-class "$@" ;;
    "test" )
        shift
        call_app run-smartpy-test-in-interpreter "$@" ;;
    "run" )
        shift
        export NODE_PATH=$smartpy_install_path/node_modules:$NODE_PATH
        python3 $install_path/smartpybasic.py "$@" ;;
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
        call_app "$@"
        ;;
esac
