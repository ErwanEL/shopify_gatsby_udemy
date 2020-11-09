import React from 'react';
import { graphql } from 'gatsby';
import { Layout, ImageGallery } from 'components';
import { Grid, SelectWrapper } from './styles';
import CartContext from 'context/CartContext';

export const query = graphql`
  query ProductQuery($shopifyId: String) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      shopifyId
      title
      description
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default function ProductTemplate(props) {
  const { getProductById } = React.useContext(CartContext);
  const [product, setProduct] = React.useState(null);
  const [selectedVariant, setSelectedVariant] = React.useState(null);

  React.useEffect(() => {
    getProductById(props.data.shopifyProduct.shopifyId).then(result => {
      setProduct(result);
      setSelectedVariant(result.variants[0]);
    });
  }, [getProductById, setProduct]);

  const handleVariantChange = e => {
    setSelectedVariant(product?.variants.find(v => v.id === e.target.value));
  };

  return (
    <Layout>
      <Grid>
        <div>
          <h1>{props.data.shopifyProduct.title}</h1>
          <p>{props.data.shopifyProduct.description}</p>
          {/* <select onChange={handleVariantChange}>
            {product?.variants.map(v => (
              <option key={v.id} value={v.id}>
                {v.title}
              </option>
            ))}
          </select>
          {console.log(selectedVariant?.price)} */}
          {/* {console.log(selectedVariant.price)} */}
          {/* <div>€{selectedVariant.price}</div> */}
          {product?.availableForSale && (
            <>
              <SelectWrapper>
                <strong>Variant</strong>
                <select onChange={handleVariantChange}>
                  {product?.variants.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.title}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
              <div>€{selectedVariant?.price}</div>
            </>
          )}
        </div>
        <div>
          <ImageGallery images={props.data.shopifyProduct.images} />
        </div>
      </Grid>
    </Layout>
  );
}
