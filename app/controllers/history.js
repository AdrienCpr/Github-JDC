import BaseController from "./basecontroller.js";
import JdcModel from "../model/JdcModel.js";

class historyController extends BaseController {
    constructor() {
        super()
        this.model = new JdcModel()
        this.initTable()
    }

    async initTable() {
        let paginationSelect = document.querySelector('#pagination-size');
        let id_user = decodeToken().id_user
        let tabledata = await this.model.getGameHistory(id_user);

        let table = new Tabulator("#example-table", {
            height: "auto",
            pagination: "local", // enable pagination
            paginationSize: parseInt(paginationSelect.value),
            data: tabledata,
            layout: "fitColumns",
            initialSort: [ // set the initial sort order
                {column: "date", dir: "desc"}
            ],
            columns: [
                {title: "Résultat", field: "result",   headerFilter: "select", headerFilterParams: {values: ['Victoire','Défaite']}},
                {title: "Adversaire", field: "opponent", headerFilter: "input"},
                {title: "Pièces", field: "coin_win",hozAlign: "center", headerFilter: "number"},
                {
                    title: "Date",
                    field: "date",
                    hozAlign: "center",
                    headerFilter: "input",
                    formatter: "datetime",
                    // formatterParams: {
                    //     outputFormat: "yyyy-MM-DD HH:mm:ss",
                    //     invalidPlaceholder: ""
                    // },
                    mutator: function(value) {
                        return luxon.DateTime.fromISO(value).toFormat("yyyy-MM-dd HH:mm:ss");
                    }
                }
            ],
        });

        paginationSelect.addEventListener('change', function(event) {
            table.setPageSize(parseInt(event.target.value));
        });

        // table.on("rowClick", function (e, row) {
        //     alert("Row " + row.getData().id + " Clicked!!!!");
        // });
    }
}

export default () => window.historyController = new historyController()
