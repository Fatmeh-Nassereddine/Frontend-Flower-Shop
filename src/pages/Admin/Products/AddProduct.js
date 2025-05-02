const AddProduct = () => {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <p>Form to create a new product (title, description, image, etc.).</p>
        <form>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" required></textarea>
          <label htmlFor="image">Image URL
          :</label>
          <input type="url" id="image" name="image" required />
          <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add Product</button>
          <p className="text-red-500 mt-2">Please fill out all fields before submitting.</p>
        </form>
        <p className="mt-4">Once added, the product will be available for viewing
        in the product catalog and can be edited or deleted as needed.
        Make sure to review the product details before finalizing your submission.</p>
        <p className="mt-4">If you have any
        questions or need assistance, please contact our support team.
        We are here to help you!
        Thank you for choosing our service!
        We appreciate your feedback and look forward to serving you better!
        We value your input and are committed to improving your experience.
        We encourage you to share your thoughts and suggestions with us.
        </p>


      </div>
      
    );
  };
  
  export default AddProduct;
  