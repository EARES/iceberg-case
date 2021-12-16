<template>
  <div class="appts">
    <div class="row g-3">
      <div class="col-12">
        <h1><u>Randevu Listesi</u></h1>
        <div class="row">
          <div class="col-12">
            <label for="person" class="form-label"
              >Çalışana göre filtrele</label
            >
            <select id="person" class="form-select" v-model="agent">
              <option selected value="">Seçiniz</option>
              <option v-for="item in agents" :key="item.id" :value="item.id">
                {{ item.fields.agent_name }} {{ item.fields.agent_surname }}
              </option>
            </select>
          </div>
        </div>
        <div class="table-responsive mt-4">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="sorting" @click="sort()">
                  Randevu Tarihi
                  <i class="sort-by-desc" v-if="date == 'desc'"></i>
                  <i class="sort-by-asc" v-else></i>
                </th>
                <th scope="col">Randevu Posta Kodu</th>
                <th scope="col">Müşteri İsmi</th>
                <th scope="col">Müşteri Soyismi</th>
                <th scope="col">Müşteri Email</th>
                <th scope="col">Müşteri Telefon</th>
                <th scope="col">Çalışan İsmi</th>
                <th scope="col">Çalışan Soyismi</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in appts"
                :key="item.id"
                :class="[
                  isPast(item.fields.appointment_date) ? 'past-date' : '',
                ]"
              >
                <td>
                  {{ dateFormat(item.fields.appointment_date) }}
                </td>
                <td>{{ item.fields.appointment_postcode }}</td>
                <td>
                  <span v-for="name in item.fields.contact_name" :key="name">
                    {{ name }}
                  </span>
                </td>
                <td>
                  <span
                    v-for="surname in item.fields.contact_surname"
                    :key="surname"
                  >
                    {{ surname }}
                  </span>
                </td>
                <td>
                  <span v-for="email in item.fields.contact_email" :key="email">
                    {{ email }}
                  </span>
                </td>
                <td>
                  <span v-for="phone in item.fields.contact_phone" :key="phone">
                    {{ phone }}
                  </span>
                </td>
                <td>
                  <span
                    v-for="agentname in item.fields.agent_name"
                    :key="agentname"
                  >
                    {{ agentname }}
                  </span>
                </td>
                <td>
                  <span
                    v-for="agentsurname in item.fields.agent_surname"
                    :key="agentsurname"
                  >
                    {{ agentsurname }}
                  </span>
                </td>
                <td>
                  <button
                    class="btn btn-dark"
                    @click="edit(item.id)"
                    :class="[
                      isPast(item.fields.appointment_date) ? 'disabled' : '',
                    ]"
                  >
                    Düzenle
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddAppointment",
  data() {
    return {
      tmpappts: [],
      appts: [],
      date: "asc",
      agent: "",
      agents: [],
    };
  },
  created() {
    this.getAppts();
    this.getAgents();
  },
  watch: {
    agent: function (val) {
      this.filterByAgent(val);
    },
  },
  methods: {
    dateFormat(param) {
      var value = new Date(param);
      return (
        ("0" + value.getDate()).slice(-2) +
        "-" +
        ("0" + (value.getMonth() + 1)).slice(-2) +
        "-" +
        value.getFullYear() +
        " " +
        ("0" + value.getHours()).slice(-2) +
        ":" +
        ("0" + value.getMinutes()).slice(-2)
      );
    },
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
    sort() {
      if (this.date === "asc") {
        this.appts.sort(
          (a, b) =>
            new Date(a.fields.appointment_date).getTime() -
            new Date(b.fields.appointment_date).getTime()
        );
        this.date = "desc";
      } else {
        this.appts.sort(
          (a, b) =>
            new Date(b.fields.appointment_date).getTime() -
            new Date(a.fields.appointment_date).getTime()
        );
        this.date = "asc";
      }
    },
    getAppts() {
      this.$axios
        .get("Appointments")
        .then((response) => {
          this.appts = response.data.records;
          this.tmpappts = this.appts;
        })
        .catch((error) => {
          alert(error);
        });
    },
    isPast(parameter) {
      const today = new Date();
      if (today > new Date(parameter)) {
        return true;
      } else {
        return false;
      }
    },
    filterByAgent(val) {
      if (val) {
        this.appts = this.tmpappts.filter(function (x) {
          return x.fields.agent_id[0] == val;
        });
      } else {
        this.appts = this.tmpappts;
      }
    },
    edit(id) {
      this.$router.push(`/editappt/${id}`);
    },
  },
};
</script>
<style scoped>
.sort-by-asc {
  left: 3px;
  display: inline-block;
  width: 0;
  height: 0;
  border: solid 5px transparent;
  margin: 4px 4px 0 3px;
  background: transparent;
  border-bottom: solid 7px #f80;
  border-top-width: 0;
}

.sort-by-desc {
  left: 3px;
  display: inline-block;
  width: 0;
  height: 0;
  border: solid 5px transparent;
  margin: 4px 4px 0 3px;
  background: transparent;
  border-top: solid 7px #f80;
  border-bottom-width: 0;
}

.sorting {
  cursor: pointer;
}

.past-date {
  opacity: 0.4;
  cursor: not-allowed;
}

.past-date .btn {
  cursor: not-allowed;
}
</style>