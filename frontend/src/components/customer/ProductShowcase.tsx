type Product = {
  name: string;
  image: string;
  price: string;
  unit: string;
  tags: string[];
};

const products: Product[] = [
  {
    name: 'A2 Buffalo Milk',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDmOuHzFOeV_NjGq07tygKvS9Q0v7E6kG8F4Z8Ceqy0NJgVFkrB0AI_AN3d0C2q5CJoL8jXwiA1kAnlzU_nd45PhCkqid2RJcPgXCiwOBlC4Te_FTb2p3MUKX7EQZ8wNkUJnVBopmntgizPESw0Mf9USiP37PgGC-iRvszntWX21gA3SrgiWaPdmdEHLy0k-kk5HERwxmJum6DkqE2ltG7mz2aWRQKWg08VKbbU34xXCl5Jf84DLTg9l5LTZoH9jbN9h6gm8-mNf2Q',
    price: '84',
    unit: 'Litre',
    tags: ['6.0% FAT', 'FARM FRESH'],
  },
  {
    name: 'Vedic Bilona Ghee',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHTMtCzQHNb8zZ9HrAlpoVyrhHDLt1J1rhXvRhkexTh9Fkuwden0kLtoz2Hj3IRVZ35ezWFgwX46nVvLwmGgtg0Rjai5XZAdqkFeyJaoax__q3sglPTdFh1v04E2S7i2rJcfgDb-dfGMCRQgtdJ2ODVj2psf28IPnUucBAnZWsExcnYzStDeh2pKqANJlSWyzlyaftydphkDiJUM0QhgryKrkBY4TrywGfPMHNfkItvYlSESOSbXjCmLJWFBP7BmHyUvdAl45Wv9g',
    price: '1,250',
    unit: '500ml',
    tags: ['WOOD-PRESSED'],
  },
  {
    name: 'Set Curd (Dahi)',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6l3fRvQpZHhLjtmTFwBMKca62GLfiBiCxOJYl1m3Ofo24J_GIfXy_pELja92_R7eg16USfNwquw2I0lWNEGrOEBMDmmZID6402YHjii6K_isZf42vvihSKwmXt1IAgelmvC1OqEdw8wtQkZNJTWgLrIqMQQy_zRpgvA2nPgaLdKBfXZHYdXeITpJy25AhllmdK5RHZ-NZ6TLoGlxSECb0gF-V8b4GfuZNfSrI_Hj_Dz19vV9zhAKahzqP2j3KMl31UFP-rF3AU34',
    price: '45',
    unit: '400g',
    tags: ['PROBIOTIC'],
  },
  {
    name: 'Classic Cow Milk',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcgFXtCgodbnSjVblasAzjQaKfZcS142qutwRIhk7lKU_mVy1fVb7wTJpZpLfLRvcGaz2eyvQ2Jha8xKwxrP7MO65KKE9Ddq06xYDN4vSqI_r_HUL5ou5os4GDKISTvt9et2XBy4PWRLfAqvRnxvAC4HryceyQeeNh0dhJNm8JFycv9Yy4QFbd3MhKYU81MsR7vSDG3Mz54hPH9sKeB-gXLYWyjooRX2sPnoKjQfidgek4myDLSzNhC_Ap9fm0mnpR2idNX3uMSg',
    price: '68',
    unit: 'Litre',
    tags: ['3.5% FAT'],
  },
];

export function ProductShowcase() {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Fresh from our Farm</h2>
          <p className="text-slate-500 text-sm mt-1">
            Verified organic dairy products delivered within 12 hours of milking.
          </p>
        </div>
        <Link to="/customer/products" className="text-xs font-bold text-primary flex items-center gap-2 group btn-interact">
          View Marketplace
          <span
            className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1"
            data-icon="arrow_forward"
          >
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.name} className="group bg-white rounded-3xl p-4 border border-slate-100 card-hover flex flex-col">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-slate-50">
              <img alt={product.name} className="w-full h-full object-cover" src={product.image} />
              <div className="absolute top-3 left-3">
                <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-full uppercase flex items-center gap-1 shadow-sm">
                  <span
                    className="material-symbols-outlined text-[10px]"
                    data-icon="verified"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  Purity Verified
                </span>
              </div>
            </div>

            <h4 className="font-bold text-slate-900">{product.name}</h4>
            <div className="flex gap-2 mt-2 mb-4">
              {product.tags.map((tag) => (
                <span
                  key={`${product.name}-${tag}`}
                  className="text-[9px] font-bold text-slate-400 uppercase tracking-wider border border-slate-100 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between">
              <p className="text-lg font-black text-slate-900">
                &#8377;{product.price}{' '}
                <span className="text-[10px] font-medium text-slate-400 uppercase">/ {product.unit}</span>
              </p>
              <button className="w-10 h-10 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center btn-interact">
                <span
                  className="material-symbols-outlined text-lg"
                  data-icon="add"
                  style={{ fontVariationSettings: "'wght' 700" }}
                >
                  add
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
import { Link } from 'react-router-dom';
