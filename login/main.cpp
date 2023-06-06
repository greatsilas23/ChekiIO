#include <iostream>

using namespace std;
void line();
void fillLine();
void login();

char fillLine(int init, int fin, int height){


        for(int j = 0; j <= height; j = j + 20){
     for(int i =init; i <= fin; i = i + 20){
            return '0';
        }
    }

}
void line(int a, int b, int height){
    int initA = 0;
    while(initA <= height){
            while(a <= b){
                cout << "(" << endl;
                cout <<  a << endl;
                cout << b<< endl;
                cout << (a+1)<< endl;
                cout << ")" << endl;
                a++;
            }
            initA++;
    }
    return;
}
void login(){

    line(0, 100, 100);
    return;
}
int main()
{
    cout << "Hello world!" << endl;
    login();
    return 0;
}
