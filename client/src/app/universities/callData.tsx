// api calls here
import BlankPage from '../../components/pages/BlankPage';

export default async function Page() {
  try {
    // get all uni's data
    // const response = await fetch('http://localhost:3004/api/sheets-robot', {
    //   cache: 'no-store',
    // });

    const response = await fetch(
      'http://localhost:3004/api/sheets-robot/sheets-single',
      {
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const uniData = result.success ? result.data : [];
    console.log(uniData);

    return (
      <div className="overflow-scroll">
        hi
        {/* <BlankPage universities={uniData} /> */}
      </div>
    );
  } catch (error) {
    console.error('Error fetching university data on Page:', error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h3>Failed to load universities</h3>
        <p>
          Make sure your server is running and the spreadsheet ID is correct.
        </p>
      </div>
    );
  }
}
