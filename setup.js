import { WIDTH, HEIGHT } from './actionsAndGameConstants.js';
import {Circle, Rect} from './objects.js';

export function game(staff){

    let x = 30 , y = 30;
    for(let j = 0 ; y < WIDTH; j++){
        for(let i = 0 ; x < HEIGHT; i++){
            staff.push(new Rect(x, y, 40 ,40 , 'red'));
            x += 70 ;
            let y_2 = y - 10 ;
            if(j == 0)
                for(; y_2 < HEIGHT ;){
                    staff.push(new Circle(x - 15 , y_2, 'yellow'));
                    y_2 += 8 ;
                }
        }
        let x_2 = 15 ;
        y += 70 ;
        for(; x_2 < WIDTH ; ){
            staff.push(new Circle(x_2 , y - 15, 'yellow'));
            x_2 += 8;
        }
        x = 30 ;
    }

    y = 20;
    x = 15;
    for(; y < HEIGHT; ){
        staff.push(new Circle(x , y , 'yellow')) ;
        y += 8 ;
    }

    y = 15 ;
    x = 15 ;
    for(; x < WIDTH ; ){
        staff.push(new Circle(x , y , 'yellow')) ;
        x += 8;
    }
}