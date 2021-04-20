import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { motion } from 'framer-motion';

const easing = [0.6, 0.05, 0.01, 0.99];

const cardVariants = {
  hidden: {
    y: 60,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const staggerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const Product = (props) => (
  <motion.div exit={{ opacity: 0 }} initial="hidden" animate="visible">
    <div className="fullscreen">
      <div className="product">
        <motion.div
          className="img"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.img
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            key={props.product.image}
            src={props.product.image}
          />
        </motion.div>
        <div className="product-details">
          <motion.div className="inner" variants={staggerVariants}>
            <Link href="/">
              <motion.div variants={cardVariants}>
                <a className="go-back">Back to products</a>
              </motion.div>
            </Link>
            <motion.div variants={cardVariants}>
              <span className="category">Protein</span>
            </motion.div>
            <motion.h1 variants={cardVariants}>{props.product.name}</motion.h1>
            <motion.p variants={cardVariants}>{props.product.details}</motion.p>
            <motion.div variants={cardVariants} className="additonals">
              <span>Soy Free</span>
              <span>Gluten Free</span>
            </motion.div>
            <motion.div className="qty-price" variants={cardVariants}>
              <div className="qty">
                <div className="minus">-</div>
                <div className="amount">1</div>
                <div className="add">+</div>
              </div>
              <span className="price">{props.product.price}</span>
            </motion.div>
            <motion.div className="btn-row" variants={cardVariants}>
              <button className="add-to-cart"> Add to cart</button>
              <button className="subscribe"> Subscribe</button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

Product.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(
    `http://my-json-server.typicode.com/wrongakram/demo/products/${id}`
  );
  const product = await res.json();
  return { product };
};

export default Product;
