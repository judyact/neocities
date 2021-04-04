/* App.jsx */
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      menuOpen:false,
    }
  }
  
  handleMenuClick() {
    this.setState({menuOpen:!this.state.menuOpen});
  }
  
  handleLinkClick(val) {
    this.setState({menuOpen: false});
    console.log(val);
    
    if (val.localeCompare('Resume') == 0) {
      window.location.href="https://drive.google.com/file/d/1RKBYbGrk_UatJnvVpd-W1dMw24eiP-A7/view?usp=sharing";
    } else if (val.localeCompare('Voice Over') == 0) {
      window.location.href="https://www.backstage.com/u/judy-lee/media/audio/";
    } else if (val.localeCompare('Writing') == 0) {
      window.location.href="https://drive.google.com/drive/folders/1FDuDZsv_QTkHzhrLeI00MNnBzl7zth5x?usp=sharing";
    };
    // window.location.href="http://google.com";
  }
  
  render(){
    const styles= 
      {
        container:{
          position: 'absolute',
          top: 2,
          left: 20,
          zIndex: '99',
          opacity: 1,
          display:'flex',
          alignItems:'center',
          background: 'transparent',
          width: '50%',           // JL: Adjust this when re-arranging header links
          color: 'pink',
          fontFamily:'Lobster',
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          filter: this.state.menuOpen ? 'blur(2px)':null,
          transition: 'filter 0.5s ease',
        },        
      }
    const menu = ['Resume', 'Voice Over', 'Writing']
    const menuItems = menu.map((val,index)=>{
      return (
        <MenuItem 
          key={index} 
          delay={`${index * 0.1}s`}
          onClick={()=>{this.handleLinkClick(val);}}>{val}</MenuItem>)
    });
    
    return(
      <div>
        <div style={styles.container}>
          <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='black'/>
        </div>
        <Menu open={this.state.menuOpen}>
          {menuItems}
        </Menu>
      </div>
    )
  }
}

/* MenuItem.jsx*/
class MenuItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hover:false,
    }
  }
  
  handleHover(){
    this.setState({hover:!this.state.hover});
  }
  
  render(){
    const styles={
      container: {
        opacity: 0,
        animation: '1s appear forwards',
        animationDelay:this.props.delay,
      },
      menuItem:{
        fontFamily:`'Open Sans', sans-serif`,
        fontSize: '1.2rem',
        padding: '1rem 0',
        margin: '0 5%',
        cursor: 'pointer',
        color: this.state.hover? 'blue':'black',
        transition: 'color 0.2s ease-in-out',
        animation: '0.5s slideIn forwards',
        animationDelay:this.props.delay,

      },
      line: {
        width: '90%',
        height: '1px',
        background: 'pink',
        margin: '0 auto',
        animation: '0.5s shrink forwards',
        animationDelay:this.props.delay,
        
      }
    }
    return(
      <div style={styles.container}>
        <div 
          style={styles.menuItem} 
          onMouseEnter={()=>{this.handleHover();}} 
          onMouseLeave={()=>{this.handleHover();}}
          onClick={this.props.onClick}
        >
          {this.props.children}  
        </div>
      <div style={styles.line}/>
    </div>  
    )
  }
}

/* Menu.jsx */
class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: this.props.open? this.props.open:false,
    }
  }
    
  componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open){
      this.setState({open:nextProps.open});
    }
  }
  
  render(){
    const styles={
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: this.state.open? '100%': 0,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        background: 'transparent',
        opacity: 1,
        color: 'black',
        transition: 'height 0.3s ease',
        zIndex: 2,
      },
      menuList: {
        paddingTop: '3rem',
        backgroundColor: '#f542b0',
      }
    }
    return(
      <div style={styles.container}>
        {
          this.state.open?
            <div style={styles.menuList}>
              {this.props.children}
            </div>:null
        }
      </div>
    )
  }
}

/* MenuButton.jsx */
class MenuButton extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: this.props.open? this.props.open:false,
      color: this.props.color? this.props.color:'black',
      hover:false,
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open){
      this.setState({open:nextProps.open});
    }
  }
  
  handleClick(){
  this.setState({open:!this.state.open});
  }
  
  handleHover(){
    this.setState({hover:!this.state.hover});
  }

  render(){
    const styles = {
      container: {
        height: '32px',
        width: '32px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '4px',
        background: this.state.hover? '#f542b0':'#FF69B4',
      },
      line: {
        height: '2px',
        width: '20px',
        background: this.state.color,
        transition: 'all 0.2s ease',
      },
      lineTop: {
        transform: this.state.open ? 'rotate(45deg)':'none',
        transformOrigin: 'top left',
        marginBottom: '5px',
				background: 'white',
      },
      lineMiddle: {
        opacity: this.state.open ? 0: 1,
        transform: this.state.open ? 'translateX(-16px)':'none',
				background: 'white',
      },
      lineBottom: {
        transform: this.state.open ? 'translateX(-1px) rotate(-45deg)':'none',
        transformOrigin: 'top left',
        marginTop: '5px',
				background: 'white',
      },       
    }
    return(
      <div style={styles.container}
        onMouseEnter={()=>{this.handleHover();}}
        onMouseLeave={()=>{this.handleHover();}}
        onClick={this.props.onClick ? this.props.onClick: 
          ()=> {this.handleClick();}}>
        <div style={{...styles.line,...styles.lineTop}}/>
        <div style={{...styles.line,...styles.lineMiddle}}/>
        <div style={{...styles.line,...styles.lineBottom}}/>
      </div>
    )
  }
}

/* Main.jsx */
class Main extends React.Component {
  render(){
    const styles = {
      main: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        height: '100vh',
      }
    }
    
    return (
      <div style={styles.main}>
        <App />
      </div>
    )
  }
}

ReactDOM.render(
     <Main/>,document.querySelector('#hamburger'));
