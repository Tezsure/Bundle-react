#!/usr/bin/env bash

set -e

export FORCE_COLOR=1

command_docs="* help
  Display this help message."

say () {
    {
        printf "[SmartPyBasic] "
        printf "$@"
        printf "\n"
    } >&2
}

download () {
    local uri="$1"
    local out="$2"
    say "Downloading $out ..."
    if [ -f "$out" ] ; then
        rm "$out"
    fi
    curl -s "$uri" -o "./$out"
    if [ -f "$out" ] ; then
        :
    else
        say "Download of '$uri' failed"
        exit 4
    fi
}

run_local_name="run"
install_path=$(dirname "$0")
command_docs="$command_docs


* $run_local_name <contract.py>
  Call a SmartPy script using the local installation.
  Example:
    $0 $run_local_name $install_path/scripts/demo.py"

run_local () {
    python3 $install_path/smartpybasic.py $1
}


test_local_name="test"
command_docs="$command_docs

* $test_local_name <contractBuilder.py> <output-directory>
  Test a contract."
test_local () {
    local contract="$1"
    local target_dir="$2"
    if [ "$target_dir" = "" ] ; then
        say "$test_local_name: Wrong command line"
        usage
        exit 8
    fi
    local basecontract="$(basename $contract)"
    local scenariofile="$target_dir/$basecontract.sc"
    local pyadaptedfile="$target_dir/${basecontract}_gen.py"
    ensure_locally_installed "$install_path"
    mkdir -p "$target_dir/"
    rm -f $scenariofile $pyadaptedfile $target_dir/test.output $target_dir/testContractCode*
    PYTHONPATH="$install_path/" python3 "$install_path/smartpybasic.py" \
              "$contract" \
              --scenario "$scenariofile" \
              --pyadaptedfile "$pyadaptedfile"
    set -o pipefail
    node "$install_path/smartmlbasic.js" \
         --scenario "$scenariofile" \
         --outputDir "$target_dir" 2>&1 > $target_dir/test.output \
        | (grep -v '\[DEP0005\] DeprecationWarning: Buffer() is deprecated' || :)
}

compile_local_name="compile"
command_docs="$command_docs

* $compile_local_name <contractBuilder.py> <class-call> <output-directory>
  Compile a contract to michelson."
compile_local () {
    local contract="$1"
    local class_call="$2"
    local target_dir="$3"
    if [ "$target_dir" = "" ] ; then
        say "$compile_local_name: Wrong command line"
        usage
        exit 8
    fi
    local basecontract="$(basename $contract)"
    local sexprfile="$target_dir/$basecontract.smlse"
    local pyadaptedfile="$target_dir/${basecontract}_gen.py"
    ensure_locally_installed "$install_path"
    mkdir -p "$target_dir/"
    rm -f $sexprfile $pyadaptedfile $target_dir/*.tz
    PYTHONPATH="$install_path/" python3 "$install_path/smartpybasic.py" \
              "$contract" \
              --class_call "$class_call" \
              --sexprfile "$sexprfile" \
              --pyadaptedfile "$pyadaptedfile"
    node "$install_path/smartmlbasic.js" \
         --compile "$sexprfile" \
         --outputDir "$target_dir"
}

minimal_install_name="local-install"
command_docs="$command_docs

* $minimal_install_name <path>
  Install a local (minimal) distribution of SmartPy for command line usage."
minimal_install () {
    if [ "$1" = "" ] ; then
        say "$minimal_install_name: Missing install path argument."
        say "Use '$minimal_install_name ~' to install ~/SmartPyBasic."
        exit 2
    fi
    local path="$1/SmartPyBasic"
    mkdir -p "$path" || {
        say "$minimal_install_name: Wrong path, argument"
        exit 5
    }
    say "Installing minimal distribution in '$path'"
    (
        cd "$path"
        mkdir -p scripts
        download https://SmartPy.io/SmartPyBasic/smartpy.py      smartpy.py
        download https://SmartPy.io/SmartPyBasic/smartpyio.py    smartpyio.py
        download https://SmartPy.io/SmartPyBasic/smartpybasic.py smartpybasic.py
        download https://SmartPy.io/SmartPyBasic/browser.py      browser.py
        download https://SmartPy.io/SmartPyBasic/version.py              version.py
        download https://SmartPy.io/SmartPyBasic/smartmljs.bc.js smartmljs.bc.js
        download https://SmartPy.io/SmartPyBasic/SmartPy.sh      SmartPy.sh
        download https://SmartPy.io/SmartPyBasic/smartmlbasic.js smartmlbasic.js
        download https://SmartPy.io/SmartPyBasic/demo.py         scripts/demo.py
        download https://SmartPy.io/$custom/reference.html          reference.html
        download https://SmartPy.io/$custom/asciidoctor.css         asciidoctor.css
        download https://SmartPy.io/$custom/coderay-asciidoctor.css coderay-asciidoctor.css
        npm install libsodium-wrappers-sumo bs58check chalk
        chmod +x SmartPy.sh
        say "Installation successful! in "`pwd`
        ls -ltr `pwd`/SmartPy.sh
    ) || {
        say "$minimal_install_name: Installation failed."
        exit 4
    }
}

minimal_install_name_custom="local-install-custom"
command_docs="$command_docs

* $minimal_install_name_custom <version> <path>
  Install a local (minimal) distribution of SmartPy for command line usage."
minimal_install_custom () {
    if [ "$1" = "" ] ; then
        say "$minimal_install_name_custom: Missing custom path argument."
        say "Use '$minimal_install_name_custom MyCustomVersion ~' to install ~/SmartPyBasic."
        exit 2
    fi
    if [ "$2" = "" ] ; then
        say "$minimal_install_name_custom: Missing install path argument."
        say "Use '$minimal_install_name_custom MyCustomVersion ~' to install ~/SmartPyBasic."
        exit 2
    fi
    local custom="$1"
    local path="$2/SmartPyBasic"
    mkdir -p "$path" || {
        say "$minimal_install_name_custom: Wrong path, argument"
        exit 5
    }
    say "Installing minimal distribution in '$path'"
    (
        cd "$path"
        mkdir -p scripts
        download https://SmartPy.io/$custom/smartpy.py              smartpy.py
        download https://SmartPy.io/$custom/smartpyio.py            smartpyio.py
        download https://SmartPy.io/$custom/smartpybasic.py         smartpybasic.py
        download https://SmartPy.io/$custom/browser.py              browser.py
        download https://SmartPy.io/$custom/version.py              version.py
        download https://SmartPy.io/$custom/smartmljs.bc.js         smartmljs.bc.js
        download https://SmartPy.io/$custom/SmartPy.sh              SmartPy.sh
        download https://SmartPy.io/$custom/smartmlbasic.js         smartmlbasic.js
        download https://SmartPy.io/$custom/demo.py                 scripts/demo.py
        download https://SmartPy.io/$custom/reference.html          reference.html
        download https://SmartPy.io/$custom/asciidoctor.css         asciidoctor.css
        download https://SmartPy.io/$custom/coderay-asciidoctor.css coderay-asciidoctor.css
        npm install libsodium-wrappers-sumo bs58check chalk
        chmod +x SmartPy.sh
        say "Installation successful! in "`pwd`
        ls -ltr `pwd`/SmartPy.sh
    ) || {
        say "$minimal_install_name_custom: Installation failed."
        exit 4
    }
}

ensure_locally_installed () {
    local path="$1"
    if [ -f "$path/smartmlbasic.js" ] ; then
        :
    else
        say "There does not seem to be a local installation at '$path', please use the '$minimal_install_name' command"
        # At some point we could also ask the user if they want to
        # install here and then call minimal.
        exit 2
    fi
}


usage () {
    cat >&2 <<EOF

[SmartPyBasic]

Introduction: https://medium.com/@SmartPy_io/f5bd8772b74a

Install directory: $install_path

Usage: $0 <command> <arguments>

Where <command> can be:
$command_docs

EOF
}

case "$1" in
    "" | "help" | "--help" | "-h")
        usage ;;
    "--version")
        python3 "$install_path/smartpybasic.py" --version ;;
    "$minimal_install_name" )
        minimal_install "$2" ;;
    "local-install-test" )
        minimal_install_custom "test" "$2" ;;
    "local-install-dev" )
        minimal_install_custom "dev" "$2" ;;
    "$minimal_install_name_custom" )
        minimal_install_custom "$2" "$3" ;;
    "$compile_local_name" )
        shift
        compile_local "$@" ;;
    "local-compile" )
        shift
        compile_local "$@" ;;
    "$test_local_name" )
        shift
        test_local "$@" ;;
    "local-test" )
        shift
        test_local "$@" ;;
    "$run_local_name" )
        shift
        run_local "$@" ;;
    * )
        say "Unknown command '$1'"
        usage
        exit 1 ;;
esac
