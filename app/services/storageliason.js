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
            settings : localStorageService.get('settings') || {},
            /*
             * SETTERS
             */
            setLevel : function(newLevel) {
                this.data.level = newLevel;
                this.sync();
            },
            setExp : function(newExp) {
                this.data.exp = newExp;
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
            setStrength : function(newStrength) {
                this.data.strength = newStrength;
                this.sync();
            },
            setWeakness : function(newWeakness) {
                this.data.weakness = newWeakness;
                this.sync();
            },
            setTodos : function(todos) {
                this.data.todos = todos;
                this.sync();
            },
            setAttribute : function(id, value) {
                this.data.attributes[id] = value;
                this.sync();
            },
            setAttributes : function(attributes) {
                this.data.attributes = attributes;
                this.sync();
            },
            setValid : function(valid) {
                this.data.valid = valid;
                this.sync();
            },
            //SETTINGS
            setSoundEnabled : function(enabled) {
                this.settings.sound = enabled;
                this.sync();
            },
            setTheme : function(theme) {
                this.settings.theme = theme;
                this.sync();
            },
            setDefaultView : function(view) {
                this.settings.view = view;
                this.sync();
            },
            setSettingsValue : function(key, value) {
                this.settings[key] = value;
                this.sync();
                
             },
            /*
             * GETTER FUNCTIONS
             */
             getAttributes : function() {
                return this.data.attributes;
             },
             getStrength : function() {
                return this.data.strength;
             },
             getWeakness : function() {
                return this.data.weakness;
             },
             getAttribute : function(id) {
                return this.data.attributes[id];
             },
             //SETTINGS
             getTheme : function() {
                return this.settings.theme || 'starryNight';
             },
             getDefaultView : function() {
                return this.settings.view || 'main.status';
             },
             isSoundEnabled : function() {
                return this.settings.sound;
             },
            /*
             * UTILITY FUNCTIONS
             */
            init : function() {
                //Initialize User Data.
                this.data.level = 1;
                this.data.exp = 0;
                this.data.attributes = [
                    ['STR', 0, 'Strength: '],
                    ['INT', 0, 'Intelligence: '],
                    ['DEX', 0, 'Dexterity: '],
                    ['WIS', 0, 'Wisdom: '],
                    ['LCK', 0, 'Luck: '],
                    ['CHA', 0, 'Charisma: ']
                ];
                //Initialize Settings.
                this.settings.sound = false;

                this.sync();
            },
            sync : function() {
                localStorageService.set('data', this.data);
                localStorageService.set('settings', this.settings);
            },
            isValid : function() {
                return this.data.valid;
            },
            reset : function() {
                this.data = {};
                this.init();
            }
        };
    }
]);