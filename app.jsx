import Rainbow from './my_modules/rainbow';
import {jsonToMap, objToStrMap} from './my_modules/utils';
import React from 'react';
import ReactDOM from 'react-dom';

let data = require('./resource/resource.json');

let rainbow = {
    image: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
    type: 'single' // possible values: 'single' 'double'
};

let jsonMap = objToStrMap(data);

for (let [key, value] of jsonMap.entries()) {
	if(key == rainbow.type){
		rainbow.image = value[Math.floor(Math.random() * value.length)];
		break;
	}
}

ReactDOM.render(
	<Rainbow image={rainbow.image} type={rainbow.type} />, 
	document.querySelector('.root')
);