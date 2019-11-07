export const styles = {
    // Style sheet for the Layout component
    rootLayout: {
      height: '100%'
    },
    // Style sheet for the header
    header: {
      backgroundColor: 'white',
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'fixed',
      zIndex: 1,
      width: '100%',
    },
    footer: {
      textAlign: 'center',
      fontStyle: 'italic',
      width: '100%'
    },
    // Style sheet for the top left logo
    logo: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.5em',
      width: '2.5em',
      margin: '16px 24px 16px 24px',
      float: 'left'
    },
    // Style sheet for the menu component. Currently empty, but it's here in case it's needed in the future
    menu: {
    },
    // Style sheet for the core content container
    content: {
      display: 'flex',
      flexDirection: 'column',
      padding: '0 2em 0',
      height: '100vh'
    },
    // Style definitions for the background image
    background: {
      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 1.0), rgba(255, 255, 255, 0.6) 66.6%), url(assets/splashpage1.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: '0 50px 0',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden'
    },
    // Style sheet for the home component on the core content container
    home: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 50px',
      margin: 0
    },
    // Style sheet for the core login component
    login: {
      padding: 24,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    loginBackground: {
      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.6) 66.6%), url(assets/splashpage1.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: '0 50px 0',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden'
    },
    register: {
      padding: 24,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };
  