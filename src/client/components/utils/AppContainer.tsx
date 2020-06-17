import React from 'react'

interface AppContainerProps {

}

export const AppContainer: React.FC<AppContainerProps> = ({children}) => {
    return (
      <div className="app-container">
        {children}
      </div>
    );
}