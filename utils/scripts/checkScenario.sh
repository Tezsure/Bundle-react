echo "---------------------";
echo " Tests ";
echo "---------------------";
./utils/SmartPyBasic/SmartPy.sh test ./contract/demo_test.py ./test-build; 
echo "Scenario Check :"
echo "---------------------";
cat ./test-build/interpreted-scenario/scenario-interpreter-log.txt;
printf "\n---------------------\n";
