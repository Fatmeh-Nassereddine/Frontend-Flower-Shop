import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Product {id}</h2>
      <p>Form to edit product data fetched by ID.</p>
      <form>
        <label htmlFor="productName">Product Name:</label>
        <input type="text" id="productName" name="productName" required />
        <label htmlFor="productPrice">Product Price:</label>

        <input type="number" id="productPrice" name="productPrice" required />
        <label htmlFor="productDescription">Product Description:</label>
        <textarea id="productDescription" name="productDescription" required></textarea>
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Save Changes</button>
        <button type="button" className="mt-4 bg-red-500 text-white py-2 px-4 rounded" onClick={() => {/* handleCancel() */}}>Cancel</button>
        </form>
        <p className="mt-4 text-gray-600">Make sure to fill in all fields before saving.</p>
        <p className="mt-4 text-gray-600">You can edit the product details above.</p>
        <p className="mt-4 text-gray-600">Changes will be reflected in the product list after saving.</p>
        <p className="mt-4 text-gray-600">If you need to revert changes, you can refresh the page.</p>
        <p className="mt-4 text-gray-600">Ensure that the product ID is valid for successful edits.</p>
        <p className="mt-4 text-gray-600">Contact support if you encounter any issues while editing.</p>
            </div>
  );

            };
            


export default EditProduct;
