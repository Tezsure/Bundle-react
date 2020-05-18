  echo "---------------------";
echo " Tests ";
echo "---------------------";
./utils/SmartPyBasic/SmartPy.sh test ./contract/demo_test.py ./test-build; 
cat ./test-build/test.output;
echo "---------------------";
