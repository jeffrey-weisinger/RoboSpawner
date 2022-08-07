import './../css/style.css';
import $ from "jquery";
import {classSelect} from './network.js'

//this event handler still doesn't let you pass parameters without binding, i think. here, we're just creating our own function tho, so we're good!
$('#agentButton1').on('click', () => classSelect('class1'));

$('#agentButton2').on('click', () => classSelect('class2'));

$('#agentButton3').on('click', () => classSelect('class3'));    


export function agentSelectComplete(){
    $('#agentSelect').hide();
    $('#visuals').show();
}
