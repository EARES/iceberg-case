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
        <date-picker v-model="date" format="DD-MM-YYYY"></date-picker>
      </div>
      <div class="col-12">
        <Button
          :classname="'btn btn-primary'"
          :btnid="'update'"
          @click.native="update"
          :textbutton="'Güncelle'"
        ></Button>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/tr';
import Button from "@/components/Button.vue";

export default {
  name: "EditAppointment",
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
  async created() {
    const [agents, contacts] = await Promise.all([
      this.$axios.get("Agents"),
      this.$axios.get("Contacts"),
    ]);

    const appt = await this.$axios.get(`Appointments/${this.$route.params.id}`);

    this.agents = agents.data.records;
    this.contacts = contacts.data.records;
    this.date = new Date(appt.data.fields.appointment_date);
    this.zipcode = appt.data.fields.appointment_postcode;
    this.contact = appt.data.fields.contact_id[0];
    this.agent = appt.data.fields.agent_id[0];
  },
  methods: {
    update() {
      this.$axios
        .put(`Appointments/${this.$route.params.id}`, {
          fields: {
            appointment_date: this.date,
            appointment_postcode: this.zipcode,
            contact_id: [this.contact],
            agent_id: [this.agent],
          },
          typecast: true,
        })
        .then(() => {
          alert('Kayıt güncellendi');
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