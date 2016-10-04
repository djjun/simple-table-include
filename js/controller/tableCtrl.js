app.controller('mainController', function($scope) {
    var vm = this;
    
    vm.sortType     = '';
    vm.sortReverse  = false;
    vm.searchData   = '';
    vm.valorCaixa   = 0;

    vm.includeData  = {
        tipo : 'Depósito'
    };

    vm.data         = [
        { hash: 1, tipo: 'Depósito', valor: 100},
        { hash: 2, tipo: 'Depósito', valor: 150},
        { hash: 3, tipo: 'Saque', valor: 75},
        { hash: 4, tipo: 'Depósito', valor: 200}
    ];

    vm.saveValor    = saveValorFn;
    vm.removeValor  = removeValorFn;

    function makeid(){
        var id = "",
            numbers = "0123456789";

        for( var i=0; i < 5; i++ ){
            id += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        return id;
    }
    
    function saveValorFn() {
        if(vm.myForm.$valid){
            vm.data.push({
                hash    : makeid(),
                tipo    : vm.includeData.tipo,
                valor   : Number(vm.includeData.valor)
            });
        }

        vm.data.valor = '';
    }

    function removeValorFn(_hash) {
        var n = vm.data.length;
        for(var i = 0, r = n; i < r; i++){
            if(vm.data[i].hash === _hash){
                vm.data.splice(i,1);
                return false;
            }
        }
    }

    $scope.$watchCollection('vm.data', function(){
        var temp    = 0,
            n       = vm.data.length;
        for(var i = 0, r = n; i < r; i++){
            if(vm.data[i].tipo === 'Saque'){
                temp -= Number(vm.data[i].valor.toString().replace(/[,]/, "."));
            } else {
                temp += Number(vm.data[i].valor.toString().replace(/[,]/, "."));
            }
        }
        vm.valorCaixa = temp.toString().replace(/[.]/, ",");
    });



});