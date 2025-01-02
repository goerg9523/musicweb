import { useRouter } from 'next/router';

const CartPage = () => {
    const router = useRouter();

    const handlePayment = () => {
        // 示例商品數據
        const products = [
            {
                productName: "星観分析 A",
                quantity: 2,
                price: 2000
            },
            {
                productName: "星観分析 B",
                quantity: 1,
                price: 3000
            }
        ];

        // 將商品數據轉換為 URL 參數
        const productsParam = encodeURIComponent(JSON.stringify(products));
        
        // 方法 1: 直接使用 window.location
        window.location.href = `/payment?products=${productsParam}`;

        // 或方法 2: 使用 Next.js Router
        router.push({
            pathname: '/payment',
            query: { products: productsParam }
        });
    };

    return (
        <div>
            {/* 購物車界面 */}
            <button onClick={handlePayment}>結帳</button>
        </div>
    );
};

export default CartPage;