import Common from "../../scripts/common/common";

export default {
  props: ["item", "monitorPoint"],
  methods: {
    openLink(url, monitorPoint) {
      Common.openWindow(url);
    }
  }
};
