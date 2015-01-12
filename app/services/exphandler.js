'use strict';

angular.module('pauseApp').service('expHandler', 
	function() {
		return {
			expToNextLevel : [100, 100.952, 101.994, 103.135, 104.386, 105.755, 107.254, 108.896,
									110.694, 112.664, 114.821, 117.183, 119.77, 122.603, 125.706,
									129.104, 132.825, 136.901, 141.365, 146.253, 151.606, 157.47,
									163.891, 170.923, 178.624, 187.058, 196.295, 206.411, 217.49,
									229.623, 242.911, 257.464, 273.401, 290.855, 309.971, 330.905,
									353.832, 378.941, 406.439, 436.554, 469.536, 505.656, 545.214,
									588.536, 635.982, 687.942, 744.848, 807.17, 875.422, 950.17, 1032.03,
									1121.69, 1219.87, 1327.4, 1445.16, 1574.13, 1715.38, 1870.06,
									2039.47, 2225.0, 2428.19, 2650.71, 2894.41, 3161.3, 3453.6, 3773.71,
									4124.29, 4508.23, 4928.71, 5389.21, 5893.53, 6445.85, 7050.73,
									7713.18, 8438.67, 9233.21, 10103.4, 11056.3, 12100.0, 13243.0, 14494.7,
									15865.6, 17367.0, 19011.2, 20811.9, 22784.0, 24943.8, 27309.1, 29899.6,
									32736.5, 35843.5, 39246.1, 42972.6, 47053.7, 51523.2, 56418.1,
									61778.8, 67649.7, 74079.3, 81120.8, 88832.5],
			totalExpPerLevel : [100, 200.952, 302.946, 406.081, 510.467, 616.221, 723.475, 832.371,
									943.065, 1055.73, 1170.55, 1287.73, 1407.5, 1530.11, 1655.81,
									1784.91, 1917.74, 2054.64, 2196.01, 2342.26, 2493.87, 2651.33,
									2815.23, 2986.15, 3164.77, 3351.83, 3548.13, 3754.54, 3972.03,
									4201.65, 4444.56, 4702.03, 4975.43, 5266.28, 5576.25, 5907.16,
									6260.99, 6639.93, 7046.37, 7482.92, 7952.46, 8458.12, 9003.33,
									9591.87, 10227.8, 10915.8, 11660.6, 12467.8, 13343.2, 14293.4,
									15325.4, 16447.1, 17667.0, 18994.4, 20439.5, 22013.7, 23729.1,
									25599.1, 27638.6, 29863.6, 32291.8, 34942.5, 37836.9, 40998.2,
									44451.8, 48225.5, 52349.8, 56858.0, 61786.7, 67175.9, 73069.5,
									79515.3, 86566.0, 94279.2, 102718.0, 111951.0, 122054.0, 133111.0,
									145211.0, 158454.0, 172949.0, 188814.0, 206181.0, 225192.0, 246004.0,
									268788.0, 293732.0, 321041.0, 350941.0, 383677.0, 419521.0, 458767.0,
									501740.0, 548793.0, 600317.0, 656735.0, 718514.0, 786163.0, 860243.0,
									941363.0],

			/*
			 * Function: levelExp
			 * ------------------
			 * Returns the experience required for a given level to level up.
			 */
			levelExp : function(level) {
				if (level < 0)
					return 0;
				return this.expToNextLevel[level-1];
			},

			totalMinLevelExp : function(level) {
				if (level == 1)
					return 0;
				return this.totalExpPerLevel[level-2];
			},

			calculateLevel : function(totalExp) {
				for (var i = 0; i < 100; i++) {
					if (totalExp < this.totalExpPerLevel[i])
						return i+1;
				}
				return 100;
			},

			getExpForLevel : function(level, currentExp) {
				var levelExp = currentExp - this.totalMinLevelExp(level);
				return levelExp;
			},

			getExpToNextLevel : function(level, currentExp) {
				var levelExp = currentExp - this.totalMinLevelExp(level);
				return this.levelExp(level) - levelExp;
			}
		};
	}
);