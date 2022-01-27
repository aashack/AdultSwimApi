import _ from "lodash";
import config from "config";
import excel4node from "excel4node";
import CharacterService from "../services/character-service.js";
import builder from "../helpers/builder.js"


class CharacterController {
    async getAll(req, res, next) {
        const result = await CharacterService.getAll(req.query);

        res.setHeader('Content-Type', 'application/json');
        return res.status(result.statusCode).send(JSON.stringify(result,null,2));
    }

    async viewList(req, res, next) {
        const result = await CharacterService.getAll(req.query);

        let url = `${config.service.url}:${config.service.port}`;
        let pages = _.get(result, 'data.data.info.pages', 0);
        let results = _.get(result, 'data.data.results', [])
        res.render('main/characters', {
            characters: results,
            current: req.query.page || 1,
            pages: pages,
            url: url
        })
    }

    async viewProfile(req, res, next) {
        let characterId;
        if (typeof req.params.characterId === 'string') characterId = parseInt(req.params.characterId);
        if (isNaN(characterId))  characterId= req.params.characterId;

        let url = `${config.service.url}:${config.service.port}`;
        const result = await CharacterService.getCharacterById(characterId);        
            res.render('main/profile', {
            characters: result.data.data,
            url: url
        })
    }

    async getCharacterById(req, res, next) {
        let characterId;
        if (typeof req.params.characterId === 'string') characterId = parseInt(req.params.characterId);
        if (isNaN(characterId))  characterId= req.params.characterId;

        const result = await CharacterService.getCharacterById(characterId);
        res.setHeader('Content-Type', 'application/json');
        return res.status(result.statusCode).send(JSON.stringify(result,null,2));
    }

    async downloadExcelSheet(req, res, next) {
        let currentPage = _.get(req, 'query.page');
        const result = await CharacterService.getAll(req.query);
        let resultOutput = builder.jsonOutputBuilder(result);


        const wb = new excel4node.Workbook();
        const ws = wb.addWorksheet(`R&M Page ${currentPage}`);
        //Write Column Title in Excel file
        let headingColumnIndex = 1;
        resultOutput.HEADERS.forEach(heading => {
            ws.cell(1, headingColumnIndex++)
                .string(heading)
        });

        //Write Data in Excel file
        let rowIndex = 2;
        resultOutput.outputArray.forEach( record => {
            let columnIndex = 1;
            Object.keys(record ).forEach(columnName =>{
                ws.cell(rowIndex,columnIndex++)
                    .string(record [columnName])
            });
            rowIndex++;
        }); 
        wb.write(`RickAndMortyDB-Page-${currentPage}.xls`, res);
    }
};

const characterController = new CharacterController();
export default characterController;
