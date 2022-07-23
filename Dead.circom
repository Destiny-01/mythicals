pragma circom 2.0.0;
include "../poseidon.circom";
include "../comparators.circom";

template Dead() {
    signal input guess[5];
    signal input solution[5];
    signal input hashedSolution;  
    signal input saltedSolution;

    signal output injuredOut[5][5];
    signal output deadOut[5];

    component compare_dead[5];
    for (var k = 0; k < 5; k++) {
        compare_dead[k] = IsZero();
        compare_dead[k].in <== guess[k] - solution[k];
        if (1 == compare_dead[k].out) {
            deadOut[k] <-- k + 30;
        }
    }

    component compare_injured[5][5];
    for(var i = 0; i < 5; i++) {
        for(var j = 0; j < 5; j++) {
            if(i!=j){
                compare_injured[i][j] = IsZero();
                compare_injured[i][j].in <== guess[i] - solution[j];
                if (1 == compare_injured[i][j].out) {
                    injuredOut[i][j] <-- i+50;
                }
            }
        }
    }

    component poseidon = Poseidon(6);
    poseidon.inputs[0] <== solution[0];
    poseidon.inputs[1] <== solution[1];
    poseidon.inputs[2] <== solution[2];
    poseidon.inputs[3] <== solution[3];
    poseidon.inputs[4] <== solution[4];
    poseidon.inputs[5] <== saltedSolution;

    hashedSolution === poseidon.out;
}

component main {public [guess, hashedSolution]} = Dead();
