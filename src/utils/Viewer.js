import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
/**
 * 
 * @param  el  
 */

export default function $Viewer (el) {
   
    if (Array.isArray(el)) {
        el.forEach(e => {
            new Viewer(e)
        })
    } else {
        new Viewer(el)
    }
}