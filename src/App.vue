<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Vending Machine Container -->
      <div class="col-md-6 mb-4 mb-md-0">
        <div class="card p-4 shadow-sm">
          <h1 class="text-center mb-4">Vending Machine</h1>
          <form @submit.prevent="calculateChange">
            <div class="mb-3">
              <label for="bill" class="form-label">Bill:</label>
              <input type="number" id="bill" v-model.number="bill" class="form-control" required />
            </div>
            
            <div class="mb-3">
              <label for="owed" class="form-label">Owed:</label>
              <input type="number" id="owed" v-model.number="owed" class="form-control" required />
            </div>

            <button type="submit" class="btn btn-primary">Calculate Change</button>
          </form>

          <div v-if="change.length" class="mt-4">
            <h2>Change:</h2>
            <ul class="list-group">
              <li v-for="item in change" :key="item.denomination" class="list-group-item">
                {{ item.count }} ₱{{ item.denomination }} {{ item.type }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Products Section -->
      <div class="col-md-6">
        <div class="row">
          <div v-for="product in products" :key="product.name" class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card shadow-sm product-card">
              <div class="img-container">
                <img :src="product.image" class="card-img-top" alt="Product Image">
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">Price: ₱{{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>






<script>
import { getChange } from './utils/getChange';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      bill: 0,
      owed: 0,
      change: [],
      products: [
      { name: 'Mochi', price: 5, image: '/img/img9.png' },
      { name: 'Noodle', price: 7, image: '/img/img8.png' },
      { name: 'Chips', price: 10, image: '/img/img7.png' },
        { name: 'Cookies', price: 12, image: '/img/img1.png' },
        { name: 'Pancake', price: 23, image: '/img/img2.png' },
        { name: 'Silvanas', price: 27, image: '/img/img4.png' },
        { name: 'Water', price: 30, image: '/img/img5.png' },
        { name: 'Samanco', price: 100, image: '/img/img3.png' },
        { name: 'Van Houten', price: 200, image: '/img/img6.png' }
        
      ]
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
  calculateChange() {
    if (this.bill === 0 || this.owed === 0) {
      this.toast.warning('Bill and Owed amounts must be greater than 0.');
      this.change = [];
      return;
    }

    if (this.owed < 0 || this.owed > 1000) {
      this.toast.error('Owed amount must be between 0 and 1000.');
      this.change = [];
      return;
    }

    if (this.bill === this.owed) {
      this.toast.info('The bill and owed amounts are equal, no change is needed.');
      this.change = [];
      return;
    }

    const result = getChange(this.bill, this.owed);

    if (result.error) {
      this.toast.error(result.error);
      this.change = [];
    } else {
      this.change = result;
    }
  }
}

}
</script>

<style scoped>
.container {
  max-width: 1200px; 
}

.card-img-top {
  height: 100px;
  width: 110px;
  object-fit: cover; 
  transition: transform 0.3s ease; 
}

.img-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  overflow: hidden;
}

.product-card {
  cursor: pointer; 
  transition: box-shadow 0.3s ease;
}

.product-card:hover .card-img-top {
  transform: scale(1.1); 
}

.product-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 

}

.card-body {
  text-align: center; 

}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
  
  .col-md-6 {
    margin-bottom: 20px;
  }
}

@media (max-width: 576px) {
  .card-img-top {
    height: 80px;
    width: 100px;
  }
}

</style>



