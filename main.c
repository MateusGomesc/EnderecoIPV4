#include<stdio.h>
#include<stdlib.h>
#include<locale.h>
#include<string.h>

int TamanhoArray(int *array){
	//calcula tamanho do array
	int Tamanho = sizeof(array)/sizeof(array[0]);
	return Tamanho;
}

void PreencheArray(int *array, char texto[]){
	int i;
	
	for(i=0; i<TamanhoArray(array); i++){
		printf("%s", texto);
		scanf("%d", array[i]);
	}
}

void ImprimeArray(int *array){
	int i;
	
	for(i=0; i<TamanhoArray(array); i++){
		printf("%d", *array);
		array += 4;
	}
	printf("\n");
}

int main(void){
	setlocale(LC_ALL, "Portuguese");
	
	int *IPV4;
	
	//cria arrays
	IPV4 = (int*) calloc(12, sizeof(int));
	
	//Recebe IPV4 e mascara de rede
	puts("Atenção: Digite o endereço e a mascara de rede sem pontos. Coloque os zeros a esquerda quando o número não for de três digitos!\n");
	PreencheArray(IPV4, "Endereço IPV4: ");
	ImprimeArray(IPV4);
	
	//libera arrays na memória
	free(IPV4);
	return 0;
}
