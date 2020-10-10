import React from 'react'

interface NoMatchProps {

}

export const NoMatch: React.FC<NoMatchProps> = ({}) => {
    return (
      <div>
        Error 404 - The resource you have requested could not be found.
      </div>
    );
}