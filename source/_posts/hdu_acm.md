---
title: 计算机学院大学生程序设计竞赛 杭电ACM校赛
date: 2015-11-29 21:31:27
categories: [ACM,ACM]
tags: [ACM,C++,HDU]
---

比赛一共八道题，都是简单题，比赛时间4小时，三个小时AK，在此纪念一下。

比赛链接传送门：[计算机学院大学生程序设计竞赛（2015’11）](http://acm.hdu.edu.cn/contests/contest_show.php?cid=638)

## 1001 搬砖

题目要求将一堆砖块分成一块一块单独的，每次可以将一堆砖块分成两堆，消耗的体力值为两堆砖块数目的差值，问最少消耗多少体力可以将这堆砖块分完。输入第一行T，位输入数据组数，然后T行每行一个整数n表示初始的砖块数目，输出最少消耗的体力值。  

解题思路：那么要使得消耗的体力最少，就应该尽可能的将它分成数目相同的两堆，因此对于每堆砖块，假设砖块数目为x，那么有两种情况：当x位偶数时，平均分为两堆，每堆砖块数目为x/2，消耗体力为0；当x位基数时，分为两堆，砖块数目分别问x/2与x/2+1，消耗体力为1。因此得到递推公式为：  
<!-- more -->
f(x) = 2 * f(x/2)   ---   当x为偶数  

f(x) = f(x/2) + f(x/2+1) + 1   ---   当x为基数  

AC代码：  

```C++
#include <iostream>
#include <stdio.h>
using namespace std;

int fun(int n){
    if(n==1) return 0;
    if(n&1){
        return 1+fun(n/2)+fun(n/2+1);
    }
    else{
        return 2*fun(n/2);
    }
}

int main(){
    int t;
    int n;
    int ans;
    scanf("%d",&t);
    while(t--){
        scanf("%d",&n);
        ans = fun(n);
        printf("%d\n",ans);
    }
    return 0;
}
```

## 1002 投币洗衣机  

n天每天需要换洗v件衣服，当衣服屯积到一定数量时，小明会一起拿去洗，条件是这样的：当衣服总数大于等于a并且小于b，则将衣服全部洗掉，需要投2枚硬币；当衣服总数大于等于b并且小于c，则将衣服全部洗掉，需要投3枚硬币；当衣服总数大于等于c，则将衣服全部洗掉，需要投4枚硬币。问一共需要多少钱。输入第一行为n a b c分别表示天数n，以及三个条件限制的件数a b c (1<=a<b<c<=300)，第二行输入n个数，第i个数字表示第i天需要换洗的衣服数vi。  

解题思路：定义sum累计当前囤积的衣服数，if判断顺序为 当sum>=c时，就将ans+=4；当sum>=b时，将ans+=3；当sum>=a时，将ans+=2。注意每次在洗衣服的时候，都要将sum清零。  

AC代码：

```C++
#include <iostream>
#include <stdio.h>
using namespace std;

int main(){
    int n,a,b,c,tmp,sum,ans;
    while(scanf("%d%d%d%d",&n,&a,&b,&c)!=EOF){
        sum = ans = 0;
        for(int i=0;i<n;++i){
            scanf("%d",&tmp);
            sum+=tmp;
            if(sum>=c){
                sum =0;
                ans += 4;
            }
            else if(sum>=b){
                sum =0;
                ans+=3;
            }
            else if(sum>=a){
                sum =0;
                ans+=2;
            }
        }
        printf("%d\n",ans);
    }
    return 0;
}
```

## 1003 玩骰子  

两个人玩骰子游戏，每人投掷三颗骰子比大小。大小比较的规则是：若三颗骰子点数都相同，为三条；若有两颗骰子点数相同，为对子；每颗骰子点数都不同，为散牌；他们的大小顺序位三条>对子>散牌。若两人都是三条，则比较三条的点数大小，大的获胜；若两人都有对子，则比较对子点数大小，大的获胜，若还是相同，则比较剩下骰子的点数大小，大的获胜；若两人都为散牌，则先比较最大点数的骰子，大的获胜，若相同，则继续比较第二大、第三大的骰子点数。每人有且仅有一次机会选择是否要重掷骰子，重掷骰子时只能选择三个中的一个骰子进行重掷，其余两颗骰子不变，也可以放弃重掷的机会。已知两位玩家当前骰子的状态，并且第二位玩家已经不能再重掷骰子，问第一位玩家有多少的概率能获胜。  

解题思路：这个问题首先需要解决的是如何判断两人当前骰子状态的胜负情况，我这里将每个人骰子的状态转换成一个权值，通过对比这个权值的大小，来判断胜负。骰子状态与权值的转换关系是：判断如果是三条，则 val = 三条骰子点数\*10000；判断如果是对子，则 val = 对子骰子点数\*1000+剩下骰子的点数；判断如果为散牌，则val = 最大点数\*100+第二大点数\*10+最小点数。  

举几个例子：  

5 5 5  对应的 val=5\*1000=50000  

4 4 3 对应的 val=4\*1000+3  

2 4 5 对应的 val=5\*100+4\*10+2=52  

通过这样的转换就只需要判断该状态对应的val值的大小，就能知道胜负情况。  

在计算获胜概率的时候，需要注意的是，题目默认第一人会选择最优的方法进行重掷骰子，也就是需要分别计算选择第一个骰子、第二个骰子、第三个骰子进行重掷后可能获胜的概率为p1、p2、p3，然后题目所求的答案是max(p1,p2,p3)。  

AC代码：  

```C++
#include <iostream>
#include <memory.h>
#include <stdio.h>
#include <algorithm>
using namespace std;

int val(int arr[3]){
    if(arr[0]==arr[1]&&arr[1]==arr[2]){
        return arr[0]*10000;
    }
    if(arr[0]!=arr[1]&&arr[1]!=arr[2]){
        return arr[2]*100+arr[1]*10+arr[0];
    }
    else{
        if(arr[0]==arr[1]){
            return arr[1]*1000+arr[2];
        }
        return arr[1]*1000+arr[0];
    }
}

int main(){
    int t;
    int arr1[3],arr2[3];
    scanf("%d",&t);
    while(t--){
        scanf("%d%d%d%d%d%d",&arr1[0],&arr1[1],&arr1[2],&arr2[0],&arr2[1],&arr2[2]);
        sort(arr1,arr1+3);
        sort(arr2,arr2+3);
        int val1 = val(arr1);
        int val2 = val(arr2);
        if(val1>val2){
            printf("1.000\n");
        }
        else{
            int ans;
            int arr[3];
            double sum=0;
            for(int i=0;i<3;++i){
                ans=0;
                for(int j=0;j<6;++j){
                    arr[0] = arr1[0];
                    arr[1] = arr1[1];
                    arr[2] = arr1[2];
                    arr[i] = j%6+1;
                    sort(arr,arr+3);
                    if(val(arr)>val2){
                        ans++;
                    }
                }
                sum = max(sum,ans/6.0);
            }
            printf("%.3lf\n",sum);
        }
    }
    return 0;
}
```

## 1004 质方数  

输入一个n，输出距离n最接近的质方数。质方数就是质数的平方。  

解题思路：暴力，打表求出所有的质数，循环质数表，找到最接近n的质方数。  

AC代码：  

```C++
#include <iostream>
#include <stdio.h>
#include <cmath>
using namespace std;

const long long N = 100007;
long prime[N] = {0};
long num_prime = 0;
int isNotPrime[N] = {1,1};

void primeC(){
    for(long i=2;i<N;++i){
        if(!isNotPrime[i]){
            prime[num_prime++]=i;
        }
        for(long j=0;j<num_prime&&i*prime[j]<N;++j){
            isNotPrime[i*prime[j]] = 1;
            if(!(i%prime[j]))
                break;
        }
    }
    return ;
}

int main(){
    int t;
    int n;
    int ans;
    primeC();
    scanf("%d",&t);
    while(t--){
        scanf("%d",&n);
        long dis=1e9+7;
        long id;
        for(long i=0;i<num_prime;++i){
            if(abs(prime[i]*prime[i]-n)<dis){
                dis = abs(prime[i]*prime[i]-n);
                id=prime[i]*prime[i];
            }
        }
        printf("%ld\n",id);
    }
    return 0;
}
```

## 1005 ACM组队安排  

有n个队员组成若干队伍，每队可以有1人、2人或者3人，求有多少种组队情况。  

解题思路：求递推公式。假设已经有n-1个人，第n个人的组队情况有三种：自己组成一队，这样的情况数有f(n-1)；组成一个两人的队伍，则需要从n-1个人中选出1个人与第n个人组队，情况数有C(n-1,1)\*f(n-1-1)；组成三个人的队伍，则需要从n-1个人中选出2个人与第n个人组队，情况数有C(n-1,2)\*f(n-1-2)。因此f(n) = f(n-1) + C(n-1,1)\*f(n-2) + C(n-1,2)\*f(n-3)。  

AC代码：  

```C++
#include <iostream>
#include <memory.h>
#include <stdio.h>
using namespace std;

const int N = 25;
long long arr[N];
long long func[N][N];

void init(){
    arr[0] = 0;
    arr[1] = 1;
    arr[2] = 2;
    arr[3] = 5;
    memset(func,0,sizeof(func));
    func[0][0]=1;
    for(int i=1;i<N;++i){
        func[i][0]=1;
        for(int j=1;j<=i;++j){
            func[i][j] = func[i-1][j]+func[i-1][j-1];
        }
    }
    for(int i=4;i<N;++i){
        arr[i] = func[i-1][2]*arr[i-3]+arr[i-1]+(i-1)*arr[i-2];
    }
}

int main(){
    int n;
    init();
    while(scanf("%d",&n)!=EOF){

        if(n==0) break;
        printf("%lld\n",arr[n]);
    }
    return 0;
}
```

## 1006 逆袭指数  

一个数n，将n分解为若干个因子的乘积，如60可以分解为2\*3\*10，其中连续因子为2\*3，长度为2；也可以分解为3\*4\*5，连续因子为3\*4\*5，长度为3。题目给出一个n，要求出n的最长连续因子，如果最长连续因子有多个，选择最小的那个。并且这个题目设定1不是因子，所以不考虑1。  

解题思路：暴力，先求出n的所有约数，并且从小到大排序。循环这个约数数组，分别以每个约数为连续因子的起点，求出以这个约数为起点的连续因子的长度，记录下最长的连续因子长度，即为题目所求。  

AC代码：  

```C++
#include <iostream>
#include <memory.h>
#include <stdio.h>
#include <cmath>
#include <algorithm>
using namespace std;

typedef long long LL ;

int cur = 0;
long long arr[10005];

LL d[1000][2];
LL divprime(LL n) {
    LL i, cnt = 0, k = n;
    for (i = 2; i * i <= k; ++i) {
        if (n % i == 0) {
            d[cnt][0] = i;
            d[cnt][1] = 0;
            while (n % i == 0) {
                n /= i;
                d[cnt][1]++;
            }
            cnt++;
        }
    }
    if (n > 1) {
        d[cnt][0] = n;
        d[cnt][1] = 1;
        cnt++;
    }
    return cnt;
}

void finddiv(LL ceng, LL ji, LL n, LL cnt) {
    if (ceng == cnt) {
        arr[cur++] = ji;
        return;
    }
    LL i, m;
    for (i = 0, m = 1; i <= d[ceng][1]; ++i) {
        finddiv(ceng+1, ji * m, n, cnt);
        m *= d[ceng][0];
    }
}

int main(){
    long long n;

    while(scanf("%I64d",&n)!=EOF){
        cur = 0;
        finddiv(0, 1, n, divprime(n));
        sort(arr, arr + cur);
        LL index,len,tmp,x;
        LL ansLen = 0;
        for (int i = 1; i < cur; ++i) {
            tmp = n/arr[i];
            x = arr[i]+1;
            len = 1;
            while(tmp%x==0){
                len++;
                tmp/=x;
                x++;
            }
            if(len>ansLen){
                ansLen = len;
                index = i;
            }
        }
        bool first = true;
        printf("%I64d\n",ansLen);
        for(int i=index;i<index+ansLen;++i){
            if(!first) printf("*");
            printf("%I64d",arr[i]);
            first = false;
        }
        printf("\n");
    }
}
```

## 1007 油菜花王国  

有n个精灵，m个关系，有关系的精灵属于同一个家族。每个精灵有一个值，若这个值为斐波那契数，那么这个精灵所在的家族的威望就加1，求威望最大的家族的威望值是多少。  

解题思路：并查集，将所有有关系的精灵进行合并，之后循环每个精灵的值，判断是否为斐波那契数，若是则在精灵所在的集合威望值+1，之后循环找出集合威望值最大的即可。  

AC代码：  

```C++
#include <iostream>
#include <stdio.h>
#include <memory.h>
#include <algorithm>
using namespace std;

const int N = 1005;
int father[N];
long long fb[N];
int val[N];
int num;


int find(int x){
    if(father[x]==-1) return x;
    father[x] = find(father[x]);
    return father[x];
}

int uni(int x,int y){
    int fx = find(x);
    int fy = find(y);
    if(fx!=fy){
        father[fx] = fy;
    }
    return 0;
}

bool isFb(int x){
    for(int i=0;i<N;++i){
        if(fb[i]==x) return true;
        if(fb[i]>x) return false;
    }
}

void init(int n,int m){
    int tmp;
    int f,t;
    long long arr[N];
    memset(father,-1,sizeof(father));
    memset(val,0,sizeof(val));
    num = 0;
    fb[0] = fb[1] = 1;
    for(int i=2;i<N;++i){
        fb[i] = fb[i-1]+fb[i-2];
    }
    for(int i=0;i<n;++i){
        scanf("%d",arr+i);
    }
    for(int i=0;i<m;++i){
        scanf("%d%d",&f,&t);
        uni(f,t);
    }
    for(int i=0;i<n;++i){
        if(isFb(arr[i])){
            val[find(i+1)]++;
        }
    }
    int ans = -1;
    for(int i=0;i<n+1;++i){
        ans = ans>=val[i]?ans:val[i];
    }
    printf("%d\n",ans);
}

int main(){
    int n,m;
    while(scanf("%d%d",&n,&m)!=EOF){
        init(n,m);
    }
    return 0;
}
```

## 1008 游乐场  

在游乐场有n个游戏项目，每个项目都需要花费一定的钱才能玩，且每个项目只能玩一次，小明身上的钱数为k，朋友推荐了m个游戏项目让他玩，小明会优先去玩朋友推荐的项目，问小明最多能玩多少个项目。如果小明的钱不够玩完朋友推荐的所有m个项目，则输出-1，否则输出小明最多能玩的项目数。  

解题思路：贪心的思想，将每个项目所需花费的钱数存在数组arr[n]中，首先求出朋友推荐的m个项目所需要花费的总钱数sum，判断是否大于k，如果大于k，则输出-1；若小于k，则将k-=sum，并且将推荐的m个项目对应在arr数组中的值置为0，然后arr从小到大排序。从下标i从m开始循环，判断剩下的钱数是否够完第i个项目，一次类推，知道钱不够了为止，此时玩过的项目数则为小明最多能玩的项目数。  

AC代码：  

```C++
#include <iostream>
#include <stdio.h>
#include <algorithm>
using namespace std;

int main(){
    int t,n,m,tmp,ans;
    long long k;
    long long sum;
    int arr[10005];
    scanf("%d",&t);
    while(t--){
        ans = 0;
        sum = 0;
        scanf("%d%d%lld",&n,&m,&k);
        for(int i=0;i<n;++i){
            scanf("%d",arr+i);
        }
        for(int i=0;i<m;++i){
            scanf("%d",&tmp);
            sum += arr[tmp-1];
            arr[tmp-1]=0;
        }
        if(sum>k){
            printf("-1\n");
        }
        else{
            k-=sum;
            ans = m;
            sort(arr,arr+n);
            for(int i=m;i<n;++i){
                if(k>=arr[i]){
                    k-=arr[i];
                    ans++;
                }
            }
            printf("%d\n",ans);
        }
    }
    return 0;
}
```
