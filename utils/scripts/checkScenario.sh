
echo " --------------------------------";
echo " Testing your SmartContract .... ";
echo " --------------------------------";
printf "
 Test Summary : 
"
echo " ------------------";
./utils/SmartPyBasic/SmartPy.sh test ./contract/demo.py ./test-build;
printf "
 Test Scenarios :
";
echo " -------------------"
cat ./test-build/interpreted-scenario/scenario-interpreter-log.txt;
printf "

"
