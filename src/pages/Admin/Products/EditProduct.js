import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Product {id}</h2>
      <p>Form to edit product data fetched by ID.</p>
    </div>
  );
};

export default EditProduct;
