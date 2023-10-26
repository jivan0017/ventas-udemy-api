import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from '../state.service';
import { Repository } from 'typeorm';
import { StateEntity } from '../entities/state.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { stateMock } from '../__mocks__/state.mock';

describe('StateService', () => {
    let service: StateService;

    let stateRepository: Repository<StateEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StateService,
                {
                    provide: getRepositoryToken(StateEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue([
                            stateMock
                        ]),
                    },
                },
            ],
        }).compile();

        service = module.get<StateService>(StateService);
        stateRepository = module.get<Repository<StateEntity>>(
            getRepositoryToken(StateEntity)
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(stateRepository).toBeDefined();
    });

    it('should be return list of states', async () => {
        const states = await service.findAll();

        expect(states).toEqual([stateMock]);
    });

    it('should be return list of states - Error in Exception', async () => {
        jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error());
        
        expect(service.findAll()).rejects.toThrowError();
    });    
});
