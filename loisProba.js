
function binomialCoefficient (n, k){
      
    // Checking if n and k are integer
    if(Number.isNaN(n) || Number.isNaN(k)){
      return NaN;
    }
    
    if(k < 0 || k > n){
      return 0
    }
    
    if(k === 0 || k === n){
      return 1
    }
    
    if(k === 1 || k === n - 1){
      return n
    }
    
    let res = n;
    for(let i = 2; i <= k; i++){
      res *= (n - i + 1) / i;
    }
    
    return Math.round(res);
  }


function binomiale(n,p){    

    let s = 0;
    const r = Math.random(0,n);

    for(let i=0; i<n; i++){
        s += binomialCoefficient(n,i)* Math.pow(p,i) * Math.pow((1-p), (n-i));
        if(r < s){
          return i;
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

function Poisson(lambda){

    let p = Math.random();
    x=0;
    y= Math.exp(-lambda);
    z=y;

    while(z<p){
        x+=1;
        y=y*lambda/x;
        z+=y;
    }

    return x;

}

function geometric(p){
    let count  = 0;
    while (Math.random() >= p){
        count ++;
    }

    return count;
}

function hyperGeometric(x,N, K, n){

    const num = binomialCoefficient(K, x) * binomialCoefficient(N-K, n-x);
    const denom = binomialCoefficient(N,n);
    return num/denom;
    
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

    const randomRes = -Math.log(Math.random())/ lambda;
    const scaledRandom = randomRes * 9 + 1;
    return Math.round(scaledRandom);
}


function Laplace(mu, b) {
    var u = Math.random() - 0.5;
    if (u < 0) {
      return mu + b * Math.log(1 - 2 * u);
    } else {
      return mu - b * Math.log(1 - 2 * u);
    }
  }
