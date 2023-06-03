#include <iostream>

using namespace std;
void line();
void fillLine();
void login();

char fillLine(int init, int fin, int height){

int result;
        for(int j = 0; j <= height; j = j + 20){
     for(int i =init; i <= fin; i = i + 20){
            result = 0;
        }
    }
    return result;
}
void line(int a, int b, int height){
    int initA = 0;
    while(initA <= height){
            while(a <= b){
                cout << "%.0f, fillLine(a, b, intA)" << endl;
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
