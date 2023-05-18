
function binomial(n, p){
    const u = Math.random(0,n);
    let s = math.cumsum(p);
    for(let i=0; i<n; i++){
        if(u < s[i]){
            return n;
        }
    }

    return -1;
}

function normalDistribution(moyenne, equartType){
    let u = 0;
    let v = 0;

    while (u==0){
        u = Math.random();
    }
    while (v == 0){
        v = Math.random();
    }

    let normalVar = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    return normalVar* Math.sqrt(equartType) + moyenne ;
}

function factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    
    return result;
  }

function Poisson(lambda, k){

    let exp = Math.exp(-lambda);
    let puiss = Math.pow(lambda, k);

    let facto = factorial(k);

    return (exp * puiss)/ facto;

}

function geometric(p){
    let count  = 0;
    while (Math.random() >= p){
        count ++;
    }

    return count;
}

function hyperGeometric(N, K, n){
    let count = 0;

    for(let i in n){

        if(Math.random()< (K/N)){
            count ++;
            K --;
        }

        N --;
    }

    return count;
}

function negativeBinomiale(k, p){

    let success = 0;
    let fail = 0;

    while(success < k){
        if(Math.random() < p){
            success ++ ;
        }
        else{
            fail++;
        }
    }

    return fail;
}

function exponentielle(lambda){

    return -Math.log(Math.random())/ lambda;
}


function Laplace(mu, b){
    
    const u = Math.random() - 0.5;

    return mu * (b* Math.sign(u) *  Math.log(1 - 2 * Math.abs(u)));
}

