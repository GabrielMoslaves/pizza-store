import Box from "../../../../components/Box";
import { useSelector } from "../../../../hooks/useSelector";
import styles from "./styles.module.scss";

const ProductionNoteModal = ({ openNoteModal, setOpenNoteModal }) => {
  const { selectedProducts, setSelectedProducts, paymentForm, change, totalPrice, setPaymentForm } =
    useSelector();

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setOpenNoteModal(false);
      setSelectedProducts([]);
      setPaymentForm("");
    }
  };

  if (!openNoteModal) {
    return null;
  }

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div
      className={styles["modal-overlay"]}
      onClick={handleOutsideClick}
    >
      <div className={styles.modal}>
        <h3>La Toca Produtos Alimentícios ltda</h3>
        <div>
          <Box>
            <p>R. Marcheral Deodoro da Fonseca - PR</p>
            <p>CNPJ: 63.488.000/0001-49</p>
            <Box
              display="flex"
              justifyContent="space-between"
            >
              <p>IE: 90.3995478-05</p>
              <p>UF: PR</p>
            </Box>
            <p>IM: Isento</p>
            <p>
              ---------------------------------------------------------------------------------------
            </p>
            <Box
              display="flex"
              justifyContent="space-between"
            >
              <p>{formatDate(new Date())}</p>
              <p>CCF: 000002</p>
              <p>COO: 0000</p>
            </Box>
            <p>
              ---------------------------------------------------------------------------------------
            </p>
            <Box textAlign="center">
              <h2>GUIA DE PRODUÇÃO</h2>
            </Box>
          </Box>

          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <Box maxWidth={70}>
                      {product.name}
                      {product.observation && <Box fontSize={10}>*{product.observation}</Box>}
                    </Box>
                  </td>
                  <td>{product.qtd}un.</td>
                  <td>{product.price.toFixed(2)}</td>
                  <td>{(product.qtd * product.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <Box
              marginTop={20}
              display="Flex"
              justifyContent="space-between"
            >
              <p>Total: </p>
              <p style={{ fontWeight: "bold" }}>R$ {totalPrice.toFixed(2)}</p>
            </Box>

            <Box
              display="Flex"
              justifyContent="space-between"
            >
              <p>Forma de Pagamento: </p>
              <p>{paymentForm}</p>
            </Box>
            <Box
              display="Flex"
              justifyContent="space-between"
            >
              <p>Troco:</p>
              <p style={{ fontWeight: "bold" }}>
                R${change ? (change - totalPrice).toFixed(2) : "--"}
              </p>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionNoteModal;
