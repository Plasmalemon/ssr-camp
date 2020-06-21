import React from 'react'
import { Route } from 'react-router-dom'

function Status({ code, children }) {
    return (
        <Route render={({ staticContext }) => {
            if (staticContext) {
                staticContext.statusCode = code
            }

            return children
        }}>

        </Route>
    )
}


export default function Notfound(props) {
    // console.log('notFound', props)
    return (
        <Status code={404}>
            404
        </Status>
    )
}