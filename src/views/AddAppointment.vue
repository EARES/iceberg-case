<template>
  <div class="addappt">
    <div class="row g-3">
      <div class="col-12">
        <label for="contact" class="form-label">Müşteri</label>
        <select id="contact" class="form-select" v-model="contact">
          <option selected value="" disabled>Seçiniz</option>
          <option v-for="item in contacts" :key="item.id" :value="item.id">
            {{ item.fields.contact_name }} {{ item.fields.contact_surname }} -
            {{ item.fields.contact_email }} - {{ item.fields.contact_phone }}
          </option>
        </select>
      </div>
      <div class="col-4">
        <label for="person" class="form-label">Çalışan</label>
        <select id="person" class="form-select" v-model="agent">
          <option selected value="" disabled>Seçiniz</option>
          <option v-for="item in agents" :key="item.id" :value="item.id">
            {{ item.fields.agent_name }} {{ item.fields.agent_surname }}
          </option>
        </select>
      </div>
      <div class="col-4">
        <label for="zipcode" class="form-label">Posta Kodu</label>
        <input
          type="text"
          class="form-control"
          id="zipcode"
          placeholder="Posta kodunu giriniz"
          v-model="zipcode"
        />
      </div>
      <div class="col-4">
        <label for="date" class="form-label">Randevu Tarihi</label>
        <date-picker id="date" v-model="date" format="DD-MM-YYYY"></date-picker>
      </div>
      <div class="col-12">
        <Button
          :classname="'btn btn-primary'"
          :btnid="'create'"
          @click.native="create"
          :textbutton="'Oluştur'"
        ></Button>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/tr";

export default {
  name: "AddAppointment",
  components: { DatePicker, Button },
  data() {
    return {
      zipcode: "",
      date: "",
      agent: "",
      contact: "",
      contacts: [],
      agents: [],
    };
  },
  created() {
    this.getAgents();
    this.getContacts();
  },
  methods: {
    getAgents() {
      this.$axios
        .get("Agents")
        .then((response) => {
          this.agents = response.data.records;
        })
        .catch((error) => {
          alert(error);
        });
    },
    getContacts() {
      this.$axios
        .get("Contacts")
        .then((response) => {
          this.contacts = response.data.records;
        })
        .catch((error) => {
          alert(error);
        });
    },
    create() {
      this.$axios
        .post("Appointments", {
          fields: {
            appointment_date: this.date,
            appointment_postcode: this.zipcode,
            contact_id: [this.contact],
            agent_id: [this.agent],
          },
          typecast: true,
        })
        .then(() => {
          alert("Kayıt Eklendi");
          this.$router.push("/appts");
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>
<style>
.mx-datepicker {
  width: unset;
  display: block;
}
.mx-input {
  height: 39px !important;
}
</style>