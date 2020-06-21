import React from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'


// 方案二
// function withStyle(Comp, styles) {
//     function NewComp(props) {
//         if (props.staticContext) {
//             props.staticContext.css.push(styles._getCss())
//         }

//         return <Comp {...props} />
//     }
//     NewComp.loadData = Comp.loadData
//     return NewComp
// }


// https://github.com/mridgway/hoist-non-react-statics
// https://zh-hans.reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
// 务必复制静态方法


// 方案三 react推荐解决方式
function withStyle(Comp, styles) {
    function NewComp(props) {
        if (props.staticContext) {
            props.staticContext.css.push(styles._getCss())
        }

        return <Comp {...props} />
    }
    hoistNonReactStatic(NewComp, Comp)
    return NewComp
}

export default withStyle
