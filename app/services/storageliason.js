'use strict';

/*
 * Factory: storageLiason
 * ----------------------
 * Intermediary object which stores user data and synchronizes it
 * with the local storage.
 */
angular.module('pauseApp').factory('storageLiason', ['localStorageService', 
    function(localStorageService) {
        return {
            data : localStorageService.get('data') || {},
            setLevel : function(newLevel) {
                this.data.level = newLevel;
                this.sync();
            },
            setExpPercent : function(newExpPercent) {
                this.data.expPercent = newExpPercent;
                this.sync();
            },
            setName : function(newName) {
                this.data.name = newName;
                this.sync();
            },
            setGender : function(newGender) {
                this.data.gender = newGender;
                this.sync();
            },
            setBirthday : function(newBirthday) {
                this.data.birthday = newBirthday;
                this.sync();
            },
            setClassName : function(newClassName) {
                this.data.className = newClassName;
                this.sync();
            },
            setTodos : function(todos) {
                this.data.todos = todos;
                this.sync();
            },
            setValid : function(valid) {
                this.data.valid = valid;
                this.sync();
            },
            sync : function() {
                localStorageService.set('data', this.data);
            },
            isValid : function() {
                return this.data.valid;
            },
            reset : function() {
                this.data = {};
                this.sync();
            }
        };
    }
]);