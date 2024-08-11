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
              <input type="number" id="owed" v-model.number="owed" class="form-control" readonly />
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
    <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4 mb-4">
      <div class="card shadow-sm product-card">
        <div class="d-flex justify-content-center align-items-center img-container">
          <img :src="product.image" class="card-img-top" alt="Product Image">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">{{ product.name }}</h5>
          <div class="d-flex justify-content-between align-items-center">
            <p class="card-text mb-0">₱{{ product.price }}</p>
            <div class="d-flex align-items-center">
              <label for="quantity-{{ product.id }}" class="form-label me-2 mb-0">Qty:</label>
              <input
                type="number"
                :id="'quantity-' + product.id"
                v-model.number="product.quantity"
                @input="updateOwed"
                min="0"
                class="form-control form-control-sm quantity-input"
              />
            </div>
          </div>
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
  { id: 1, name: 'Mochi', price: 5, image: '/img/img9.png', quantity: 0 },
  { id: 2, name: 'Noodle', price: 7, image: '/img/img8.png', quantity: 0 },
  { id: 3, name: 'Chips', price: 10, image: '/img/img7.png', quantity: 0 },
  { id: 4, name: 'Cookies', price: 12, image: '/img/img1.png', quantity: 0 },
  { id: 5, name: 'Pancake', price: 23, image: '/img/img2.png', quantity: 0 },
  { id: 6, name: 'Silvanas', price: 27, image: '/img/img4.png', quantity: 0 },
  { id: 7, name: 'Water', price: 30, image: '/img/img5.png', quantity: 0 },
  { id: 8, name: 'Samanco', price: 100, image: '/img/img3.png', quantity: 0 },
  { id: 9, name: 'Van Houten', price: 200, image: '/img/img6.png', quantity: 0 }
]

    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
  updateOwed() {
    this.owed = this.products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  },
  calculateChange() {
    if (this.bill === 0 || this.owed === 0) {
      this.toast.warning('Bill and owed amounts must be greater than 0.');
      this.change = [];
      return;
    }

    if (this.owed > 1000) {
      this.toast.error('Owed amount must be less than or equal to 1000.');
      this.change = [];
      return;
    }

    if (this.bill < this.owed) {
      this.toast.error('Bill amount must be greater than or equal to the owed amount.');
      this.change = [];
      return;
    }

    if (this.bill === this.owed) {
      this.toast.info('No change is required.');
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
.card-img-top {
  height: 100px;
  width: 110px;
  object-fit: cover; 
  transition: transform 0.3s ease; 
}

.img-container {
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

.quantity-input {
  max-width: 60px; /* Adjusted width */
  padding: 2px 5px; /* Compact padding */
  font-size: 0.875rem; /* Smaller font size */
}

#owed {
  pointer-events: none; /* Disable click and focus */
  background-color: #f8f9fa; /* Gives a visual cue it's non-editable */
  cursor: not-allowed; /* Shows a "not allowed" cursor */
}
</style>
