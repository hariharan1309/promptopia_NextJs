import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
export const metadata = {
  title:"promptopia"
}
const Rootlayout = ({children}) => {
 return (
      <html>
        <body>
          <Provider>
            <div className='main'>
              <div className='gradient'/>
            </div>
            <main className='app'>
              <Nav /> {/*We need the nav to be used for all the pages */}
              {children}
            </main>
          </Provider>
        </body>
      </html>
  );
}

export default Rootlayout;