

export default function Home () {

    function test() {
      fetch('http://localhost:3000/api/test')
      .then(res => res.json)
      .then(data => console.log(data));
    }

    return <section>
    <button onClick={test}>
      test
    </button>

    </section>;
  }