import { Button } from '@mui/material'
import React from 'react'

export const Example: React.FC = () => {
    return (
        <div>
            <Button variant="contained" color="secondary">Click me</Button>
            <button>Can't touch this</button>
        </div>
    )
}
