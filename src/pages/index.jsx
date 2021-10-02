import Login from 'components/Login';
import Footer from 'components/Footer';

function Index() {
  return (
    <div className='Pant_inicial'>
    <section>            
      <ul className='breedCardContainer'>        
        <Login/>
      </ul>
    </section>
    <Footer/>
    </div>
  );
}

export default Index;